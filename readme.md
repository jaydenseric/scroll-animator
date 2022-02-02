# scroll-animator

[![npm version](https://badgen.net/npm/v/scroll-animator)](https://npm.im/scroll-animator) [![CI status](https://github.com/jaydenseric/scroll-animator/workflows/CI/badge.svg)](https://github.com/jaydenseric/scroll-animator/actions)

Smart, lightweight functions to animate browser scroll.

- Scroll the page or a specific element.
- Scroll vertically and horizontally.
- Scroll to a target element or an arbitrary position, with an optional offset.
- Scroll animations can be interrupted by the user or other scripts (no “fighting” animations).
- Scroll animations adapt to a moving target; handy when loading affects layout.
- Intuitive [`easeInOutCubic`](https://easings.net/#easeInOutCubic) animation timing; a soft acceleration and deceleration.
- < 1 kB bundle size, tested.
- SSR friendly.

## Setup

To install with [npm](https://npmjs.com/get-npm), run:

```sh
npm install scroll-animator
```

## Support

- [Node.js](https://nodejs.org): `^12.22.0 || ^14.17.0 || >= 16.0.0`
- [Browsers](https://npm.im/browserslist): `> 0.5%, not OperaMini all, not IE > 0, not dead`

Consider polyfilling:

- [`document.scrollingElement`](https://caniuse.com/#feat=document-scrollingelement)
- [`window.requestAnimationFrame`](https://caniuse.com/#feat=requestanimationframe)

## Exports

These ECMAScript modules are published to [npm](https://npmjs.com) and exported via the [`package.json`](./package.json) `exports` field:

- [`animateScroll.mjs`](./animateScroll.mjs)
- [`scrollToElement.mjs`](./scrollToElement.mjs)
