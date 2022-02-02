import getTargetScrollPos from "../private/getTargetScrollPos.mjs";
import animateScroll from "./animateScroll.mjs";

/**
 * Scrolls a container to a target element, using
 * [`animateScroll`]{@link animateScroll}. The animation adapts to a moving
 * target; handy when loading affects layout.
 * @kind function
 * @name scrollToElement
 * @param {object} options Options.
 * @param {HTMLElement} [options.container=document.scrollingElement] Container element to scroll.
 * @param {HTMLElement} options.target Target element to scroll to.
 * @param {number} [options.offsetX=0] Target X position offset.
 * @param {number} [options.offsetY=0] Target Y position offset.
 * @param {number} [options.duration=500] Total scroll animation duration in milliseconds.
 * @param {Function} [options.onInterrupt] Callback to run if the scroll animation is interrupted.
 * @param {Function} [options.onArrive] Callback to run after scrolling to the target.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { scrollToElement } from "scroll-animator";
 * ```
 *
 * ```js
 * import scrollToElement from "scroll-animator/public/scrollToElement.mjs";
 * ```
 * @example <caption>Scroll the page to an element.</caption>
 * ```js
 * scrollToElement({
 *   target: document.getElementById("contact-us"),
 * });
 * ```
 */
export default function scrollToElement(options) {
  const container = options.container || document.scrollingElement;
  const { scrollWidth, scrollHeight } = container;
  const targetScrollPos = getTargetScrollPos(container, options.target);
  const config = {
    container,
    targetX: targetScrollPos.x,
    targetY: targetScrollPos.y,
    offsetX: options.offsetX,
    offsetY: options.offsetY,
    duration: options.duration,
    onInterrupt: options.onInterrupt,
    onArrive() {
      // If the container scroll dimensions change, scroll afresh to the shifted
      // target.
      if (
        scrollWidth !== config.container.scrollWidth ||
        scrollHeight !== config.container.scrollHeight
      )
        scrollToElement(options);
      if (typeof options.onArrive === "function") options.onArrive();
    },
  };

  animateScroll(config);
}
