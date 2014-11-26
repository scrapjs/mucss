/** Returns parsed css value. */
module.exports = function (str){
	str += '';
	return parseFloat(str.slice(0,-2)) || 0;
};