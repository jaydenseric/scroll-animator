# scroll-animator changelog

## Next

### Minor

- Added a changelog in `changelog.md`.
- Declared the package side-effect free for [bundler tree-shaking](https://webpack.js.org/guides/tree-shaking).

### Patch

- Prevented `package-lock.json` via `.npmrc` and `.gitignore`.
- Shorthand package `repository` field.
- HTTPS package author URL.
- Use package `prepare` script to support installation via Git (e.g. `npm install jaydenseric/scroll-animator`).

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
