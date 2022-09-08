// @ts-check

import animateScroll, { durationDefault } from "./animateScroll.mjs";
import getTargetScrollPos from "./getTargetScrollPos.mjs";

export {
  /** The {@linkcode scrollToElement} option `duration` default value. */
  durationDefault,
};

/**
 * Scrolls a container to a target element, using {@linkcode animateScroll}. The
 * animation adapts to a moving target; handy when loading affects layout.
 * @param {object} options Options.
 * @param {Element} [options.container] Container element to scroll. Defaults to
 *   `document.scrollingElement`.
 * @param {Element} options.target Target element to scroll to.
 * @param {number} [options.offsetX] Target X position offset. Defaults to `0`.
 * @param {number} [options.offsetY] Target Y position offset. Defaults to `0`.
 * @param {number} [options.duration] Total scroll animation duration in
 *   milliseconds. Defaults to {@linkcode durationDefault}.
 * @param {() => void} [options.onInterrupt] Callback to run if the scroll
 *   animation is interrupted.
 * @param {() => void} [options.onArrive] Callback to run after scrolling to the
 *   target.
 * @example
 * Scroll the page to an element:
 *
 * ```js
 * scrollToElement({
 *   target: document.getElementById("contact-us"),
 * });
 * ```
 */
export default function scrollToElement(options) {
  const {
    container = document.scrollingElement,
    target,
    offsetX,
    offsetY,
    duration,
    onInterrupt,
    onArrive,
  } = options;

  if (!(container instanceof Element))
    throw new TypeError("Option `container` must be a `Element` instance.");

  if (!(target instanceof Element))
    throw new TypeError("Option `target` must be a `Element` instance.");

  const { scrollWidth, scrollHeight } = container;
  const { x: targetX, y: targetY } = getTargetScrollPos(container, target);
  const animateScrollOptions = {
    container,
    targetX,
    targetY,
    offsetX,
    offsetY,
    duration,
    onInterrupt,
    onArrive() {
      if (
        // Container scroll dimensions changed.
        container.scrollWidth !== scrollWidth ||
        container.scrollHeight !== scrollHeight
      )
        // Scroll afresh to the shifted target.
        scrollToElement(options);
      else if (typeof onArrive === "function") onArrive();
    },
  };

  animateScroll(animateScrollOptions);
}
