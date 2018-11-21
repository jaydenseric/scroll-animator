# scroll-animator

[![npm version](https://badgen.net/npm/v/scroll-animator)](https://npm.im/scroll-animator) [![Build status](https://travis-ci.org/jaydenseric/scroll-animator.svg?branch=master)](https://travis-ci.org/jaydenseric/scroll-animator)

Smart, lightweight functions to animate browser scroll.

- Scroll the page or a specific element.
- Scroll vertically and horizontally.
- Scroll to a target element or an arbitrary position, with an optional offset.
- Scroll animations can be interrupted by the user or other scripts (no “fighting” animations).
- Scroll animations adapt to a moving target; handy when loading affects layout.
- Intuitive [`easeInOutCubic`](https://easings.net/#easeInOutCubic) animation timing; a soft acceleration and deceleration.
- &lt; 1 KB bundle size, guaranteed by [`size-limit`](https://npm.im/size-limit) tests.

## Setup

Install with [npm](https://npmjs.com):

```shell
npm install scroll-animator
```

## Support

Browserslist query: [`> 0.5%, not dead, node 6`](https://browserl.ist/?q=%3E+0.5%25%2C+not+dead%2C+node+6).

Consider polyfilling:

- [`document.scrollingElement`](https://developer.mozilla.org/docs/Web/API/document/scrollingElement)
- [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame)

## API

### Table of contents

- [function animateScroll](#function-animatescroll)
- [function scrollToElement](#function-scrolltoelement)

### function animateScroll

Smoothly scrolls an element to a target position within the element. Scroll interference caused by the user or another script interrupts the animation.

| Parameter             | Type                                       | Description                                                                 |
| :-------------------- | :----------------------------------------- | :-------------------------------------------------------------------------- |
| `options`             | [Object](https://mdn.io/object)            | Options.                                                                    |
| `options.container`   | HTMLElement? = `document.scrollingElement` | Container element to scroll.                                                |
| `options.targetX`     | [number](https://mdn.io/number)?           | Target X position within the container, defaulting to the current position. |
| `options.targetY`     | [number](https://mdn.io/number)?           | Target Y position within the container, defaulting to the current position. |
| `options.offsetX`     | [number](https://mdn.io/number)? = `0`     | Target X position offset.                                                   |
| `options.offsetY`     | [number](https://mdn.io/number)? = `0`     | Target Y position offset.                                                   |
| `options.duration`    | [number](https://mdn.io/number)? = `500`   | Total scroll animation duration in milliseconds.                            |
| `options.onInterrupt` | [function](https://mdn.io/function)?       | Callback to run if the scroll animation is interrupted.                     |
| `options.onArrive`    | [function](https://mdn.io/function)?       | Callback to run after scrolling to the target.                              |

### function scrollToElement

Scrolls a container to a target element, using [`animateScroll`](#function-animatescroll). The animation adapts to a moving target; handy when loading affects layout.

| Parameter             | Type                                       | Description                                             |
| :-------------------- | :----------------------------------------- | :------------------------------------------------------ |
| `options`             | [Object](https://mdn.io/object)            | Options.                                                |
| `options.container`   | HTMLElement? = `document.scrollingElement` | Container element to scroll.                            |
| `options.target`      | HTMLElement                                | Target element to scroll to.                            |
| `options.offsetX`     | [number](https://mdn.io/number)? = `0`     | Target X position offset.                               |
| `options.offsetY`     | [number](https://mdn.io/number)? = `0`     | Target Y position offset.                               |
| `options.duration`    | [number](https://mdn.io/number)? = `500`   | Total scroll animation duration in milliseconds.        |
| `options.onInterrupt` | [function](https://mdn.io/function)?       | Callback to run if the scroll animation is interrupted. |
| `options.onArrive`    | [function](https://mdn.io/function)?       | Callback to run after scrolling to the target.          |
