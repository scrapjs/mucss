/**
 * Window scrollbar detector.
 *
 * @module mucss/has-scroll
 */
exports.x = function(){
	return win.innerHeight > root.clientHeight;
};
exports.y = function(){
	return win.innerWidth > root.clientWidth;
};