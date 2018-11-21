# Scroll animator

[![npm version](https://badgen.net/npm/v/scroll-animator)](https://npm.im/scroll-animator) [![Build status](https://travis-ci.org/jaydenseric/scroll-animator.svg?branch=master)](https://travis-ci.org/jaydenseric/scroll-animator)

A collection of functions for animating browser scroll.

- Written in ES6.
- Implements UMD.
- IE 11 and modern browser support.
- [MIT license](https://en.wikipedia.org/wiki/MIT_License).

## Setup

Install scroll animator in your project as an NPM dependency:

```shell
npm install scroll-animator --save
```

Be sure to polyfill:

- `document.scrollingElement`
- `window.requestAnimationFrame`

For example:

```shell
npm install scrollingelement --save
```

```js
import 'scrollingelement'
```

Import relevent functions:

```js
import { scrollToElement } from 'scroll-animator'
```

## API

### Table of contents

- [function animateScroll](#function-animatescroll)
- [function easeInOutCubic](#function-easeinoutcubic)
  - [See](#see)
- [function getScrollMax](#function-getscrollmax)
- [function getTargetScrollPos](#function-gettargetscrollpos)
- [function scrollToElement](#function-scrolltoelement)

### function animateScroll

Smoothly scrolls an element. Scroll interference caused by the user or another script cancels the animation.

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

### function easeInOutCubic

An `easeInOutCubic` easing function.

| Parameter | Type                            | Description                                                               |
| :-------- | :------------------------------ | :------------------------------------------------------------------------ |
| `t`       | [number](https://mdn.io/number) | Decimal representing elapsed time out of the complete animation duration. |

**Returns:** [number](https://mdn.io/number) — Easing multiplier.

#### See

- [“Bezier Curve based easing functions – from concept to implementation”](http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation)

### function getScrollMax

Gets an element's scroll max X and Y positions.

| Parameter   | Type        | Description                                |
| :---------- | :---------- | :----------------------------------------- |
| `container` | HTMLElement | Container element with scrolling overflow. |

**Returns:** [Object](https://mdn.io/object) — X and Y scroll max positions in pixels.

### function getTargetScrollPos

Gets the scroll offset of an element within a container.

| Parameter   | Type        | Description        |
| :---------- | :---------- | :----------------- |
| `container` | HTMLElement | Container element. |
| `target`    | HTMLElement | Target element.    |

**Returns:** [Object](https://mdn.io/object) — The x and y offset in pixels.

### function scrollToElement

Scrolls a container to a target element.

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
