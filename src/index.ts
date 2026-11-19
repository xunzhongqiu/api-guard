import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: (error?: Error) => void) => void;

/** Attach a server-generated request ID for log correlation. */
export function requestId(header = "x-request-id"): Middleware {
  return (_req, res, next) => {
    const id = randomUUID();
    res.setHeader(header, id);
    next();
  };
}

type Bucket = { count: number; resetAt: number };
export type RateLimitOptions = { windowMs: number; max: number; key?: (req: IncomingMessage) => string };

/** In-memory fixed-window limiter. Use a shared store for multi-process deployments. */
export function rateLimit({ windowMs, max, key = (req) => req.socket.remoteAddress ?? "unknown" }: RateLimitOptions): Middleware {
  if (windowMs <= 0 || max < 1) throw new Error("windowMs and max must be positive");
  const buckets = new Map<string, Bucket>();
  return (req, res, next) => {
    const now = Date.now();
    const id = key(req);
    let bucket = buckets.get(id);
    if (!bucket || bucket.resetAt <= now) bucket = { count: 0, resetAt: now + windowMs };
    bucket.count += 1;
    buckets.set(id, bucket);
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", Math.max(0, max - bucket.count));
    res.setHeader("RateLimit-Reset", Math.ceil(bucket.resetAt / 1000));
    if (bucket.count > max) {
      res.statusCode = 429;
      res.setHeader("Retry-After", Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)));
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ error: "Too many requests" }));
      return;
    }
    next();
  };
}

/** Send a predictable JSON error without leaking internal exception details. */
export function errorHandler(log: (error: Error) => void = console.error): (error: Error, res: ServerResponse) => void {
  return (error, res) => {
    log(error);
    if (res.headersSent) return res.destroy(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Internal server error" }));
  };
}
