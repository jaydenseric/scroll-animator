/**
 * Gets an element’s scroll max X and Y positions.
 * @kind function
 * @name getScrollMax
 * @param {HTMLElement} element Element with scrolling overflow.
 * @returns {object} X and Y scroll max positions in pixels.
 * @ignore
 */
export default function getScrollMax(element) {
  const container =
    element === document.scrollingElement ? document.documentElement : element;

  return {
    x: container.scrollWidth - container.clientWidth,
    y: container.scrollHeight - container.clientHeight,
  };
}
