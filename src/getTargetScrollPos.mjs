/**
 * Gets the scroll offset of an element within a container.
 * @kind function
 * @name getTargetScrollPos
 * @param {HTMLElement} container Container element.
 * @param {HTMLElement} target Target element.
 * @returns {object} The x and y offset in pixels.
 * @ignore
 */
export function getTargetScrollPos(container, target) {
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
    y: Math.round(ScrollPosY),
  }
}
