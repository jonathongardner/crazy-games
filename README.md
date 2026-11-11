# Crazy Games

The Vue 3.5, TypeScript, and Vite version of Crazy Games. It currently includes Mastermind with
persisted settings and offline PWA support.

## Requirements

- Node.js `^22.18.0` or `>=24.12.0`
- npm 11 or newer

## Development

```sh
npm install
npm run dev
```

The production app uses the `/crazy-games/` base path and hash-based routes so it can be hosted on
GitHub Pages without server-side route rewriting.

## Verification

```sh
npm test
npm run type-check
npm run build
npm run preview
```

PWA behavior is generated only by production builds. In a production preview, verify that the app
can be installed, reloads offline after its first visit, and shows a prompt when a new service worker
is ready.
