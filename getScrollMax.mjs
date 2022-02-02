// @ts-check

/**
 * Gets an element’s scroll max X and Y positions.
 * @param {Element} element Element with scrolling overflow.
 * @returns {{ x: number, y: number }} X and Y scroll max positions in pixels.
 */
export default function getScrollMax(element) {
  const container =
    element === document.scrollingElement ? document.documentElement : element;

  return {
    x: container.scrollWidth - container.clientWidth,
    y: container.scrollHeight - container.clientHeight,
  };
}
