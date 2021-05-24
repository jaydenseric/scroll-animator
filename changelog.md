# scroll-animator changelog

## Next

### Major

- Updated Node.js support to `^12.20 || >= 14.13`.
- Stopped supporting Internet Explorer.
- Updated dev dependencies, some of which require newer Node.js versions than were previously supported.
- Removed the package `module` field.
- Added a package [`exports`](https://nodejs.org/api/packages.html#packages_exports) field with [conditional exports](https://nodejs.org/api/packages.html#packages_conditional_exports) to support native ESM in Node.js and keep internal code private, whilst avoiding the [dual package hazard](https://nodejs.org/api/packages.html#packages_dual_package_hazard). Published files have been reorganized, so previously undocumented deep imports will need to be rewritten according to the newly documented paths.
- Removed Babel related dev dependencies, config, and scripts. Published modules now contain more modern ES syntax.
- Published modules now contain JSDoc comments, which might affect TypeScript projects.
- Added a package `test:api` script to test the API, using [`test-director`](https://npm.im/test-director) and ESM in `.mjs` files.

### Patch

- Updated GitHub Actions CI config:
  - Also run on pull request.
  - Run tests with Node.js v12, v14, v16.
  - Updated `actions/checkout` to v2.
  - Updated `actions/setup-node` to v2.
  - Use the simpler [`npm install-test`](https://docs.npmjs.com/cli/v7/commands/npm-install-test) command.
  - Don’t specify the `CI` environment variable as it’s set by default.
- Simplified JSDoc related package scripts now that [`jsdoc-md`](https://npm.im/jsdoc-md) v10+ automatically generates a Prettier formatted readme.
- Added a package `test:jsdoc` script that checks the readme API docs are up to date with the source JSDoc.
- Improved the package `test:prettier` script.
- Reordered the package `test:eslint` script args.
- Test the bundle size manually using [`esbuild`](https://npm.im/esbuild) and [`gzip-size`](https://npm.im/gzip-size), removing [`size-limit`](https://npm.im/size-limit) related dev dependencies, config, and scripts.
- Configured Prettier option `semi` to the default, `true`.
- Removed `npm-debug.log` from the `.gitignore` file as npm [v4.2.0](https://github.com/npm/npm/releases/tag/v4.2.0)+ doesn’t create it in the current working directory.

## 3.0.0

### Major

- Updated Node.js support from v6+ to v10+.
- Updated dev dependencies, some of which require Node.js v10+.

### Minor

- Setup [GitHub Sponsors funding](https://github.com/sponsors/jaydenseric):
  - Added `.github/funding.yml` to display a sponsor button in GitHub.
  - Added a `package.json` `funding` field to enable npm CLI funding features.

### Patch

- Replaced the [`size-limit`](https://npm.im/size-limit) dev dependency with [`@size-limit/preset-small-lib`](https://npm.im/preset-small-lib).
- Removed the now redundant [`eslint-plugin-import-order-alphabetical`](https://npm.im/eslint-plugin-import-order-alphabetical) dev dependency.
- Stop using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).
- Added a new [`babel-plugin-transform-require-extensions`](https://npm.im/babel-plugin-transform-require-extensions) dev dependency and ensured ESM import specifiers in both source and published `.mjs` files contain file names with extensions, which [are mandatory in the final Node.js ESM implementation](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions). Published CJS `.js` files now also have file extensions in `require` paths.
- Added a package `module` field.
- Removed `package-lock.json` from `.gitignore` and `.prettierignore` as it’s disabled in `.npmrc` anyway.
- More specifically ignore `/lib` instead of `lib` in `.gitignore` and `.eslintignore`.
- Use strict mode for scripts.
- Refactored several arrow functions to regular functions for leaner transpiled code and better stack traces.
- Moved config from `package.json` to separate files, for a leaner install size.
- Use GitHub Actions instead of Travis for CI.
- Clarified that Opera Mini isn’t supported in the Browserslist queries and readme “Support” section.

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
