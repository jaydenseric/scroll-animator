import getScrollMaxX from 'get-scrollmax-x'
import getScrollMaxY from 'get-scrollmax-y'

/**
 * Gets an element's scroll max X and Y positions.
 * @kind function
 * @name getScrollMax
 * @param {HTMLElement} container Container element with scrolling overflow.
 * @returns {Object} X and Y scroll max positions in pixels.
 * @ignore
 */
export const getScrollMax = container =>
  container === document.scrollingElement
    ? {
        x: getScrollMaxX(),
        y: getScrollMaxY()
      }
    : {
        x: container.scrollWidth - container.clientWidth,
        y: container.scrollHeight - container.clientHeight
      }
