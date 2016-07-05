/**
 * Window scrollbar detector.
 *
 * @module mucss/has-scroll
 */

//TODO: detect any element scroll, not only the window
exports.x = function () {
	return window.innerHeight > document.body.scrollHeight;
};
exports.y = function () {
	return window.innerWidth > document.body.scrollHeight;
};