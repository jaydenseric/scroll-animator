# scroll-animator

Smart, lightweight functions to animate browser scroll.

- Scroll the page or a specific element.
- Scroll vertically and horizontally.
- Scroll to a target element or an arbitrary position, with an optional offset.
- Scroll animations can be interrupted by the user or other scripts (no “fighting” animations).
- Scroll animations adapt to a moving target; handy when loading affects layout.
- Intuitive [`easeInOutCubic`](https://easings.net/#easeInOutCubic) animation timing; a soft acceleration and deceleration.
- < 1 kB bundle size, tested.
- SSR friendly.

## Installation

For [Node.js](https://nodejs.org), to install [`scroll-animator`](https://npm.im/scroll-animator) with [npm](https://npmjs.com/get-npm), run:

```sh
npm install scroll-animator
```

For [Deno](https://deno.land) and browsers, an example import map:

```json
{
  "imports": {
    "scroll-animator/": "https://unpkg.com/scroll-animator@4.0.0/"
  }
}
```

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `^14.17.0 || ^16.0.0 || >= 18.0.0`.
- [Deno](https://deno.land).
- Browsers matching the [Browserslist](https://browsersl.ist) query [`> 0.5%, not OperaMini all, not dead`](https://browsersl.ist/?q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead).

Consider polyfilling:

- [`document.scrollingElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollingElement)
- [`window.requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

Non [Deno](https://deno.land) projects must configure [TypeScript](https://typescriptlang.org) to use types from the ECMAScript modules that have a `// @ts-check` comment:

- [`compilerOptions.allowJs`](https://typescriptlang.org/tsconfig#allowJs) should be `true`.
- [`compilerOptions.maxNodeModuleJsDepth`](https://typescriptlang.org/tsconfig#maxNodeModuleJsDepth) should be reasonably large, e.g. `10`.
- [`compilerOptions.module`](https://typescriptlang.org/tsconfig#module) should be `"node16"` or `"nodenext"`.

## Exports

The [npm](https://npmjs.com) package [`scroll-animator`](https://npm.im/scroll-animator) features [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design). It doesn’t have a main index module, so use deep imports from the ECMAScript modules that are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`animateScroll.mjs`](./animateScroll.mjs)
- [`scrollToElement.mjs`](./scrollToElement.mjs)
