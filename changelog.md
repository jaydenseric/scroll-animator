# scroll-animator changelog

## Next

### Major

- Updated Node.js support from v6+ to v10+.

### Minor

- Setup [GitHub Sponsors funding](https://github.com/sponsors/jaydenseric):
  - Added `.github/funding.yml` to display a sponsor button in GitHub.
  - Added a `package.json` `funding` field to enable npm CLI funding features.

### Patch

- Stop using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).
- Removed `package-lock.json` from `.gitignore` and `.prettierignore` as it’s disabled in `.npmrc` anyway.

## 2.0.0

### Major

- No longer exporting `easeInOutCubic`, `getScrollMax` and `getTargetScrollPos`.
- No longer publishing UMD, only CJS (`.js`) and ESM (`.mjs`).
- No longer publishing source maps.
- Removed the package `module` field. Webpack by default resolves extensionless paths the same way Node.js in `--experimental-modules` mode does; `.mjs` files are preferred.
- Renamed the published `dist` directory `lib` and separated exports into their own files.
- Environment support is now tied to the [`> 0.5%, not dead, node 6`](https://browserl.ist/?q=%3E+0.5%25%2C+not+dead%2C+node+6) Browserslist query.

### Minor

- Added a changelog in `changelog.md`.
- Publish native ESM (`.mjs`) for Node.js in `--experimental-modules` mode and modern tools such as Webpack to consume.
- Support server side rendering.
- Use package `prepare` script to support installation via Git (e.g. `npm install jaydenseric/scroll-animator`).
- Declared the package side-effect free for [bundler tree-shaking](https://webpack.js.org/guides/tree-shaking).

### Patch

- Updated dev dependencies.
- Prevented `package-lock.json` via `.npmrc` and `.gitignore`.
- Shorthand package `repository` field.
- HTTPS package author URL.
- Tweaked package description and tags.
- Whitelist files for publishing via package `files` field, instead of an `.npmignore` blacklist.
- Use `prepublishOnly` package script instead of `prepublish`.
- Removed package `watch` script.
- Added a clean build step.
- Use the Babel CLI instead of Rollup.
- Use [`jsdoc-md`](https://npm.im/jsdoc-md) instead of [`jsdoc-to-markdown`](https://npm.im/jsdoc-to-markdown).
- Use [`eslint-config-env`](https://npm.im/eslint-config-env) instead of [`eslint-config-barebones`](https://npm.im/eslint-config-barebones).
- Use [Prettier](https://prettier.io); for both linting source and formatting published code.
- Setup a linting pre-commit hook using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).
- Use [Badgen](https://badgen.net) and reduce the number of readme badges.
- Configured Travis CI and added a build status readme badge.
- Use [`size-limit`](https://npm.im/size-limit) to test bundle size is < 1 KB.

## 1.1.0

### Minor

- Added new `onInterrupt` callback options to the `animateScroll` and `scrollToElement` functions; fired when interference cancels the scroll animation, via [#1](https://github.com/jaydenseric/scroll-animator/pull/1).

## 1.0.1

### Patch

- Corrected package repository URL.
- ES6 `const` and `let` corrections.
- A minor ES6 key/value simplification.

## 1.0.0

### Major

- Replaced package `jsnext:main` field with `module`; see [webpack/webpack#1979](https://github.com/webpack/webpack/issues/1979) and [rollup/rollup#969](https://github.com/rollup/rollup/issues/969).
- Renamed the `skid.mjs` module dist file `skid.module.js`. The `.mjs` extension looks like it might not catch on.

### Patch

- Updated dependencies.
- Fixed a typo in the `scrollToElement` function that was causing a console error when the container scroll dimensions change during a scroll animation.
- More correct use of ES6 `const` and `let`.
- Reordered some code in the `animateScroll` function for readability.
- Renamed the `lib` folder `src`. This is more conventional.
- Corrected JSDoc `@param` type capitalizations.
- Use the [`eslint-config-barebones`](https://npm.im/eslint-config-barebones) ESLint shareable config.

## 0.1.0-alpha.5

### Patch

- Corrected the version number in the source JSDoc.

## 0.1.0-alpha.4

### Patch

- Added editor config.

## 0.1.0-alpha.3

### Patch

- No longer publishing readme template to npm.
- Previously missing dist files now published to npm.

## 0.1.0-alpha.2

### Patch

- Added `document.scrollingElement` polyfill instructions to the readme.

## 0.1.0-alpha.1

Initial release.
