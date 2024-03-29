// @ts-check

/**
 * Gets the scroll offset of an element within a container.
 * @param {Element} container Container element.
 * @param {Element} target Target element.
 * @returns {{ x: number, y: number }} The x and y offset in pixels.
 */
export default function getTargetScrollPos(container, target) {
  let targetBounds = target.getBoundingClientRect();
  let scrollPosX = targetBounds.left + container.scrollLeft;
  let ScrollPosY = targetBounds.top + container.scrollTop;

  if (container !== document.scrollingElement) {
    let containerBounds = container.getBoundingClientRect();

    scrollPosX -= containerBounds.left;
    ScrollPosY -= containerBounds.top;
  }

  return {
    x: Math.round(scrollPosX),
    y: Math.round(ScrollPosY),
  };
}
