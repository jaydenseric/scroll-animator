# Scroll animator

![NPM version](https://img.shields.io/npm/v/scroll-animator.svg?style=flat-square)
![Github issues](https://img.shields.io/github/issues/jaydenseric/scroll-animator.svg?style=flat-square)
![Github stars](https://img.shields.io/github/stars/jaydenseric/scroll-animator.svg?style=flat-square)

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

<a name="module_scrollAnimator.getScrollMax"></a>

### scrollAnimator.getScrollMax(container) ⇒ <code>Object</code>
Gets an element's scroll max positions.

**Kind**: static method of <code>[scrollAnimator](#module_scrollAnimator)</code>  
**Returns**: <code>Object</code> - X and Y scroll max positions in pixels.  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | Container element with scrolling overflow. |

<a name="module_scrollAnimator.getTargetScrollPos"></a>

### scrollAnimator.getTargetScrollPos(container, target) ⇒ <code>Object</code>
Gets the scroll offset of an element within a container.

**Kind**: static method of <code>[scrollAnimator](#module_scrollAnimator)</code>  
**Returns**: <code>Object</code> - The x and y offset in pixels.  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | Container element. |
| target | <code>HTMLElement</code> | Target element. |

<a name="module_scrollAnimator.easeInOutCubic"></a>

### scrollAnimator.easeInOutCubic(t) ⇒ <code>number</code>
An easeInOutCubic easing function.

**Kind**: static method of <code>[scrollAnimator](#module_scrollAnimator)</code>  
**Returns**: <code>number</code> - Easing multiplier.  
**See**: http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>number</code> | Decimal representing elapsed time out of the complete animation duration. |

<a name="module_scrollAnimator.animateScroll"></a>

### scrollAnimator.animateScroll(options)
Smoothly scrolls an element. Scroll interference caused by the user or another script cancels the animation.

**Kind**: static method of <code>[scrollAnimator](#module_scrollAnimator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Options. |
| [options.container] | <code>HTMLElement</code> | <code>document.scrollingElement</code> | Container element to scroll. |
| [options.targetX] | <code>number</code> |  | Target X position within the container, defaulting to the current position. |
| [options.targetY] | <code>number</code> |  | Target Y position within the container, defaulting to the current position. |
| [options.offsetX] | <code>number</code> | <code>0</code> | Target X position offset. |
| [options.offsetY] | <code>number</code> | <code>0</code> | Target Y position offset. |
| [options.duration] | <code>number</code> | <code>500</code> | Total scroll animation duration in milliseconds. |
| [options.onArrive] | <code>function</code> |  | Callback to run after scrolling to the target. |
| [options.onInterrupt] | <code>function</code> |  | Callback to run if scrolling is interrupted |

<a name="module_scrollAnimator.scrollToElement"></a>

### scrollAnimator.scrollToElement(options)
Scrolls a container to a target element.

**Kind**: static method of <code>[scrollAnimator](#module_scrollAnimator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Options. |
| [options.container] | <code>HTMLElement</code> | <code>document.scrollingElement</code> | Container element to scroll. |
| options.target | <code>HTMLElement</code> |  | Target element to scroll to. |
| [options.offsetX] | <code>number</code> | <code>0</code> | Target X position offset. |
| [options.offsetY] | <code>number</code> | <code>0</code> | Target Y position offset. |
| [options.duration] | <code>number</code> | <code>500</code> | Total scroll animation duration in milliseconds. |
| [options.onArrive] | <code>function</code> |  | Callback to run after scrolling to the target. |
| [options.onInterrupt] | <code>function</code> |  | Callback to run if scrolling is interrupted |

<a name="module_scrollAnimator..position"></a>

### scrollAnimator~position(start, end, elapsed, duration) ⇒ <code>number</code>
Calculates the scroll position at a given scroll animation moment.

**Kind**: inner method of <code>[scrollAnimator](#module_scrollAnimator)</code>  
**Returns**: <code>number</code> - A scroll position.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | Start scroll position. |
| end | <code>number</code> | End scroll position. |
| elapsed | <code>number</code> | Time since beginning the scroll animation in milliseconds. |
| duration | <code>number</code> | Total scroll animation duration in milliseconds. |
