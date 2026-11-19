# @portfolio/ui-kit

Small, accessible React primitives with typed props and no runtime dependencies beyond React.

## Components

- `Button`: solid/outline/ghost variants; loading state disables interaction and exposes `aria-busy`.
- `TextField`: required visible label, optional hint/error, linked descriptions, invalid state.
- `Notice`: info, success, warning, and error announcements.

## Install and build

```sh
npm install
npm run build
```

Import from `@portfolio/ui-kit`. Add your own CSS for `.ui-button`, `.ui-field`, and `.ui-notice` so visual styling remains host-app controlled.

## Design notes

Components preserve native HTML attributes, support refs where useful, and avoid imposing a styling framework. Verify keyboard and screen-reader behavior in the consuming application.
