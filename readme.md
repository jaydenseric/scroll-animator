# scroll-animator

[![npm version](https://badgen.net/npm/v/scroll-animator)](https://npm.im/scroll-animator) [![CI status](https://github.com/jaydenseric/scroll-animator/workflows/CI/badge.svg)](https://github.com/jaydenseric/scroll-animator/actions)

Smart, lightweight functions to animate browser scroll.

- Scroll the page or a specific element.
- Scroll vertically and horizontally.
- Scroll to a target element or an arbitrary position, with an optional offset.
- Scroll animations can be interrupted by the user or other scripts (no “fighting” animations).
- Scroll animations adapt to a moving target; handy when loading affects layout.
- Intuitive [`easeInOutCubic`](https://easings.net/#easeInOutCubic) animation timing; a soft acceleration and deceleration.
- < 1 KB bundle size, guaranteed by [Size Limit](https://github.com/ai/size-limit) tests.
- SSR friendly.

## Setup

Install with [npm](https://npmjs.com):

```shell
npm install scroll-animator
```

## Support

- [Node.js](https://nodejs.org): `^12.20 || >= 14.13`
- [Browsers](https://npm.im/browserslist): `> 0.5%, not OperaMini all, not IE > 0, not dead`

Consider polyfilling:

- [`document.scrollingElement`](https://caniuse.com/#feat=document-scrollingelement)
- [`window.requestAnimationFrame`](https://caniuse.com/#feat=requestanimationframe)

## API

- [function animateScroll](#function-animatescroll)
- [function scrollToElement](#function-scrolltoelement)

### function animateScroll

Smoothly scrolls an element to a target position within the element. Scroll interference caused by the user or another script interrupts the animation.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `options` | object | Options. |
| `options.container` | HTMLElement? = document.scrollingElement | Container element to scroll. |
| `options.targetX` | number? | Target X position within the container, defaulting to the current position. |
| `options.targetY` | number? | Target Y position within the container, defaulting to the current position. |
| `options.offsetX` | number? = `0` | Target X position offset. |
| `options.offsetY` | number? = `0` | Target Y position offset. |
| `options.duration` | number? = `500` | Total scroll animation duration in milliseconds. |
| `options.onInterrupt` | Function? | Callback to run if the scroll animation is interrupted. |
| `options.onArrive` | Function? | Callback to run after scrolling to the target. |

#### Examples

_Horizontally scroll an element to a certain position._

> ```js
> import { animateScroll } from 'scroll-animator';
>
> animateScroll({
>   container: document.getElementById('panner'),
>   targetX: 400,
> });
> ```

---

### function scrollToElement

Scrolls a container to a target element, using [`animateScroll`](#function-animatescroll). The animation adapts to a moving target; handy when loading affects layout.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `options` | object | Options. |
| `options.container` | HTMLElement? = document.scrollingElement | Container element to scroll. |
| `options.target` | HTMLElement | Target element to scroll to. |
| `options.offsetX` | number? = `0` | Target X position offset. |
| `options.offsetY` | number? = `0` | Target Y position offset. |
| `options.duration` | number? = `500` | Total scroll animation duration in milliseconds. |
| `options.onInterrupt` | Function? | Callback to run if the scroll animation is interrupted. |
| `options.onArrive` | Function? | Callback to run after scrolling to the target. |

#### Examples

_Scroll the page to an element._

> ```js
> import { scrollToElement } from 'scroll-animator';
>
> scrollToElement({
>   target: document.getElementById('contact-us'),
> });
> ```
