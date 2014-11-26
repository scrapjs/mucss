/** window scrollbar detectors */
exports.x = function(){
	return win.innerHeight > root.clientHeight;
};
exports.y = function(){
	return win.innerWidth > root.clientWidth;
};