/**
 * Calculate window horizontal and vertical scroll
 *
 * @module mucss/window-scroll
 *
 * @return {object} object with top and left values of current window scroll
 */

module.exports = function() {
	return {
		//@see http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
		y: window.pageYOffset || document.documentElement.scrollTop,
		x: window.pageXOffset || document.documentElement.scrollLeft
	};
};