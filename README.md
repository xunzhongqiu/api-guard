# @portfolio/api-guard

Framework-neutral middleware primitives for Node.js HTTP servers. Uses only Node built-ins at runtime.

```ts
import { createServer } from "node:http";
import { requestId, rateLimit } from "@portfolio/api-guard";

const id = requestId();
const limit = rateLimit({ windowMs: 60_000, max: 100 });
createServer((req, res) => id(req, res, () => limit(req, res, () => {
  res.end(`request ${res.getHeader("x-request-id")}`);
}))).listen(3000);
```

## Included

- `requestId`: generates a UUID response header for log correlation.
- `rateLimit`: in-memory fixed-window limiter with standard limit headers and `Retry-After`.
- `errorHandler`: logs the original exception and returns a generic JSON 500 response.

## Production notes

The limiter is process-local and resets on restart. Use a shared store behind a multi-instance service, configure trusted proxy handling before deriving client IPs, and add cleanup/observability suitable for your deployment.
