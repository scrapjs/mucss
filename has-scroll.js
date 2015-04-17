/**
 * Window scrollbar detector.
 *
 * @module mucss/has-scroll
 */
exports.x = function(){
	return window.innerHeight > document.documentElement.clientHeight;
};
exports.y = function(){
	return window.innerWidth > document.documentElement.clientWidth;
};