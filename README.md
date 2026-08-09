# Application Starter

A minimal SpyneJS application template: an entry point, a root view, and a
hello-world component demonstrating text, an image, a link, and a webfont. Use
it as the starting point for a new application.

For a template that already includes pages, navigation, and UI components, see
[application-shell](https://github.com/spynejs/application-shell).

## Requirements

Node.js 18 or newer.

## Getting started

```bash
git clone https://github.com/spynejs/application-starter.git my-app
cd my-app
rm -rf .git && git init
npm install
npm start
```

`npm start` runs the webpack dev server with hot reload.

## Scripts

| Script | Description |
| --- | --- |
| `npm start` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run build:apache` | Production build with an Apache `.htaccess` |
| `npm test` | Unit tests via Web Test Runner |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with autofix |
| `npm run format` | Prettier over `src/` |

## Structure

```
src/
  app/
    channels/      Channels — event flow and application state
    components/    ViewStreams — the hello-world component lives here
    traits/        SpyneTraits — reusable behaviour
  scss/            Styles
  static/          Data, fonts, and images
  index.js         Application entry: config and the root view
```

SpyneJS separates rendering (`ViewStream`), event flow (`Channel`), and
behaviour (`SpyneTrait`). Components are organised by those roles rather than by
feature.

## Generating modules

With [spyne-cli](https://github.com/spynejs/spyne-cli) you can generate new
modules inside this project:

```bash
npx spyne-cli
```

## Deployment

The build output in `dist/` is a static single-page application. All application
routes must resolve to `index.html`, and requests for static assets must be
served directly.

## License

MIT — see [LICENSE](LICENSE). Bundled Inter fonts are licensed under the SIL
Open Font License 1.1; see `src/static/fonts/inter/OFL.txt`.
