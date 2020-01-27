import { easeInOutCubic } from './easeInOutCubic.mjs'
import { getScrollMax } from './getScrollMax.mjs'

/**
 * Calculates the scroll position at a given scroll animation moment.
 * @kind function
 * @name position
 * @param {number} start Start scroll position.
 * @param {number} end End scroll position.
 * @param {number} elapsed Time since beginning the scroll animation in milliseconds.
 * @param {number} duration Total scroll animation duration in milliseconds.
 * @returns {number} A scroll position.
 * @ignore
 */
const position = (start, end, elapsed, duration) =>
  elapsed > duration
    ? end
    : Math.round(start + (end - start) * easeInOutCubic(elapsed / duration))

/**
 * Smoothly scrolls an element to a target position within the element. Scroll
 * interference caused by the user or another script interrupts the animation.
 * @kind function
 * @name animateScroll
 * @param {object} options Options.
 * @param {HTMLElement} [options.container=document.scrollingElement] Container element to scroll.
 * @param {number} [options.targetX] Target X position within the container, defaulting to the current position.
 * @param {number} [options.targetY] Target Y position within the container, defaulting to the current position.
 * @param {number} [options.offsetX=0] Target X position offset.
 * @param {number} [options.offsetY=0] Target Y position offset.
 * @param {number} [options.duration=500] Total scroll animation duration in milliseconds.
 * @param {Function} [options.onInterrupt] Callback to run if the scroll animation is interrupted.
 * @param {Function} [options.onArrive] Callback to run after scrolling to the target.
 * @example <caption>Horizontally scroll an element to a certain position.</caption>
 * ```js
 * import { animateScroll } from 'scroll-animator'
 *
 * animateScroll({
 *   container: document.getElementById('panner'),
 *   targetX: 400
 * })
 * ```
 */
export function animateScroll(options = {}) {
  // Establish times first.
  const duration =
    typeof options.duration !== 'undefined' ? options.duration : 500
  const startTime = Date.now()

  // Determine the container.
  const container = options.container || document.scrollingElement

  // Store start scroll positions.
  const startX = container.scrollLeft
  const startY = container.scrollTop

  // Store last scroll position for interference checking.
  let lastX = startX
  let lastY = startY

  // Determine target scroll positions.
  let targetX =
    typeof options.targetX !== 'undefined' ? options.targetX : startX
  let targetY =
    typeof options.targetY !== 'undefined' ? options.targetY : startY

  // Account for optional offsets.
  if (options.offsetX) targetX += options.offsetX
  if (options.offsetY) targetY += options.offsetY

  // Ensure scroll target is achievable when near the end.
  const scrollMax = getScrollMax(container)
  targetX = Math.min(targetX, scrollMax.x)
  targetY = Math.min(targetY, scrollMax.y)

  /**
   * Steps though the scroll animation with `window.requestAnimationFrame`.
   * @kind function
   * @name animateScroll~step
   * @ignore
   */
  function step() {
    // Check for scroll interference before continuing animation.
    if (lastX === container.scrollLeft && lastY === container.scrollTop) {
      const elapsed = Date.now() - startTime

      lastX = container.scrollLeft = position(
        startX,
        targetX,
        elapsed,
        duration
      )
      lastY = container.scrollTop = position(startY, targetY, elapsed, duration)

      if (elapsed > duration && typeof options.onArrive === 'function')
        options.onArrive()
      else window.requestAnimationFrame(step)
    } else if (typeof options.onInterrupt === 'function') options.onInterrupt()
  }

  step()
}
