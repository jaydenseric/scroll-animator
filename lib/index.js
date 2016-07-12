import getScrollMaxX from 'get-scrollmax-x'
import getScrollMaxY from 'get-scrollmax-y'

/**
 * A collection of functions for animating browser scroll. May require document.scrollingElement and window.requestAnimationFrame polyfills.
 * @module scrollAnimator
 * @see https://github.com/jaydenseric/scroll-animator
 * @version 0.1.0-alpha.5
 * @author Jayden Seric
 * @license MIT
 */

/**
 * Gets an element's scroll max positions.
 * @param {HTMLElement} container - Container element with scrolling overflow.
 * @returns {object} X and Y scroll max positions in pixels.
 */
export function getScrollMax (container) {
  if (container === document.scrollingElement) {
    return {
      x: getScrollMaxX(),
      y: getScrollMaxY()
    }
  } else {
    return {
      x: container.scrollWidth - container.clientWidth,
      y: container.scrollHeight - container.clientHeight
    }
  }
}

/**
 * Gets the scroll offset of an element within a container.
 * @param {HTMLElement} container - Container element.
 * @param {HTMLElement} target - Target element.
 * @returns {object} The x and y offset in pixels.
 */
export function getTargetScrollPos (container, target) {
  let targetBounds = target.getBoundingClientRect()
  let scrollPosX = targetBounds.left + container.scrollLeft
  let ScrollPosY = targetBounds.top + container.scrollTop
  if (container !== document.scrollingElement) {
    let containerBounds = container.getBoundingClientRect()
    scrollPosX -= containerBounds.left
    ScrollPosY -= containerBounds.top
  }
  return {
    x: Math.round(scrollPosX),
    y: Math.round(ScrollPosY)
  }
}

/**
 * An easeInOutCubic easing function.
 * @see http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation
 * @param {number} t - Decimal representing elapsed time out of the complete animation duration.
 * @returns {number} Easing multiplier.
 */
export function easeInOutCubic (t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

/**
 * Calculates the scroll position at a given scroll animation moment.
 * @param {number} start - Start scroll position.
 * @param {number} end - End scroll position.
 * @param {number} elapsed - Time since beginning the scroll animation in milliseconds.
 * @param {number} duration - Total scroll animation duration in milliseconds.
 * @returns {number} A scroll position.
 */
function position (start, end, elapsed, duration) {
  if (elapsed > duration) return end
  return Math.round(start + (end - start) * easeInOutCubic(elapsed / duration))
}

/**
 * Smoothly scrolls an element. Scroll interference caused by the user or another script cancels the animation.
 * @param {object} options - Options.
 * @param {HTMLElement} [options.container=document.scrollingElement] - Container element to scroll.
 * @param {number} [options.targetX] - Target X position within the container, defaulting to the current position.
 * @param {number} [options.targetY] - Target Y position within the container, defaulting to the current position.
 * @param {number} [options.offsetX=0] - Target X position offset.
 * @param {number} [options.offsetY=0] - Target Y position offset.
 * @param {number} [options.duration=500] - Total scroll animation duration in milliseconds.
 * @param {function} [options.onArrive] - Callback to run after scrolling to the target.
 */
export function animateScroll (options = {}) {
  // Establish times first
  let duration = typeof options.duration !== 'undefined' ? options.duration : 500
  let startTime = Date.now()

  // Determine the container
  let container = options.container || document.scrollingElement

  // Determine start and target scroll positions
  let startX = container.scrollLeft
  let startY = container.scrollTop
  let targetX = typeof options.targetX !== 'undefined' ? options.targetX : startX
  let targetY = typeof options.targetY !== 'undefined' ? options.targetY : startY

  // Remember last scroll position for interference checking
  let lastX = startX
  let lastY = startY

  // Account for optional offsets
  if (options.offsetX) targetX += options.offsetX
  if (options.offsetY) targetY += options.offsetY

  // Ensure scroll target is achievable when near the end
  let scrollMax = getScrollMax(container)
  targetX = Math.min(targetX, scrollMax.x)
  targetY = Math.min(targetY, scrollMax.y)

  /**
   * Steps though the scroll animation with window.requestAnimationFrame.
   */
  function step () {
    // Check for scroll interference before continuing animation
    if (lastX === container.scrollLeft && lastY === container.scrollTop) {
      let elapsed = Date.now() - startTime
      lastX = container.scrollLeft = position(startX, targetX, elapsed, duration)
      lastY = container.scrollTop = position(startY, targetY, elapsed, duration)
      if (elapsed > duration && typeof options.onArrive === 'function') options.onArrive()
      else window.requestAnimationFrame(step)
    }
  }
  step()
}

/**
 * Scrolls a container to a target element.
 * @param {object} options - Options.
 * @param {HTMLElement} [options.container=document.scrollingElement] - Container element to scroll.
 * @param {HTMLElement} options.target - Target element to scroll to.
 * @param {number} [options.offsetX=0] - Target X position offset.
 * @param {number} [options.offsetY=0] - Target Y position offset.
 * @param {number} [options.duration=500] - Total scroll animation duration in milliseconds.
 * @param {function} [options.onArrive] - Callback to run after scrolling to the target.
 */
export function scrollToElement (options) {
  let container = options.container || document.scrollingElement
  let scrollWidth = container.scrollWidth
  let scrollHeight = container.scrollHeight
  let targetScrollPos = getTargetScrollPos(container, options.target)
  let config = {
    container: container,
    targetX: targetScrollPos.x,
    targetY: targetScrollPos.y,
    offsetX: options.offsetX,
    offsetY: options.offsetY,
    duration: options.duration,
    onArrive: () => {
      // If the container scroll dimensions change, scroll afresh to the shifted target
      if (scrollWidth !== config.container.scrollWidth || scrollHeight !== config.container.scrollHeight) scrollToElement(config)
      if (typeof options.onArrive === 'function') options.onArrive()
    }
  }
  animateScroll(config)
}
