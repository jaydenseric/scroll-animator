'use strict';

/**
 * An `easeInOutCubic` easing function.
 * @see [`easeInOutCubic`](https://easings.net/#easeInOutCubic)
 * @see [“Bezier Curve based easing functions – from concept to implementation”](http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation)
 * @kind function
 * @name easeInOutCubic
 * @param {number} t Decimal representing elapsed time out of the complete animation duration.
 * @returns {number} Easing multiplier.
 * @ignore
 */
module.exports = function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
