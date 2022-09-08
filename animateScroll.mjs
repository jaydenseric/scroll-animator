// @ts-check

import easeInOutCubic from "./easeInOutCubic.mjs";
import getScrollMax from "./getScrollMax.mjs";

/** The {@linkcode animateScroll} option `duration` default value. */
export const durationDefault = 500;

/**
 * Calculates the scroll position at a given scroll animation moment.
 * @param {number} start Start scroll position.
 * @param {number} end End scroll position.
 * @param {number} elapsed Time since beginning the scroll animation in
 *   milliseconds.
 * @param {number} duration Total scroll animation duration in milliseconds.
 * @returns {number} A scroll position.
 */
function position(start, end, elapsed, duration) {
  return elapsed > duration
    ? end
    : Math.round(start + (end - start) * easeInOutCubic(elapsed / duration));
}

/**
 * Smoothly scrolls an element to a target position within the element. Scroll
 * interference caused by the user or another script interrupts the animation.
 * @param {object} options Options.
 * @param {Element} [options.container] Container element to scroll.
 *   Defaults to `document.scrollingElement`.
 * @param {number} [options.targetX] Target X position within the container.
 *   Defaults to the current position.
 * @param {number} [options.targetY] Target Y position within the container.
 *   Defaults to the current position.
 * @param {number} [options.offsetX] Target X position offset. Defaults to `0`.
 * @param {number} [options.offsetY] Target Y position offset. Defaults to `0`.
 * @param {number} [options.duration] Total scroll animation duration in
 *   milliseconds. Defaults to {@linkcode durationDefault}.
 * @param {() => void} [options.onInterrupt] Callback to run if the scroll
 *   animation is interrupted.
 * @param {() => void} [options.onArrive] Callback to run after scrolling to the
 *   target.
 * @example
 * Horizontally scroll an element to a certain position:
 *
 * ```js
 * animateScroll({
 *   container: document.getElementById("panner"),
 *   targetX: 400,
 * });
 * ```
 */
export default function animateScroll(options) {
  const { container = document.scrollingElement, duration = durationDefault } =
    options;

  if (!(container instanceof Element))
    throw new TypeError("Option `container` must be a `Element` instance.");

  // Establish the start time ASAP.
  const startTime = Date.now();

  // Store start scroll positions.
  const startX = container.scrollLeft;
  const startY = container.scrollTop;

  // Store last scroll position for interference checking.
  let lastX = startX;
  let lastY = startY;

  // Determine target scroll positions.
  let { targetX = startX, targetY = startY } = options;

  // Account for optional offsets.
  if (options.offsetX) targetX += options.offsetX;
  if (options.offsetY) targetY += options.offsetY;

  // Ensure scroll target is achievable when near the end.
  const scrollMax = getScrollMax(container);
  targetX = Math.min(targetX, scrollMax.x);
  targetY = Math.min(targetY, scrollMax.y);

  /** Steps though the scroll animation with `window.requestAnimationFrame`. */
  const step = () => {
    if (
      // Scroll position changed, not by this scroll animation.
      container.scrollLeft !== lastX ||
      container.scrollTop !== lastY
    ) {
      // This scroll animation was interrupted.
      if (typeof options.onInterrupt === "function") options.onInterrupt();
    } else {
      const elapsed = Date.now() - startTime;

      container.scrollLeft = lastX = position(
        startX,
        targetX,
        elapsed,
        duration
      );
      container.scrollTop = lastY = position(
        startY,
        targetY,
        elapsed,
        duration
      );

      if (elapsed > duration && typeof options.onArrive === "function")
        options.onArrive();
      else window.requestAnimationFrame(step);
    }
  };

  step();
}
