/**
 * Parse element’s borders
 *
 * @module mucss/borders
 */

var Rect = require('./Rect');
var parse = require('./parse-value');

/**
 * Return border widths of an element
 */
module.exports = function(el){
	if (el === window) return new Rect;

	if (!(el instanceof Element)) throw Error('Argument is not an element');

	var style = window.getComputedStyle(el);

	return new Rect(
		parse(style.borderLeftWidth),
		parse(style.borderTopWidth),
		parse(style.borderRightWidth),
		parse(style.borderBottomWidth)
	);
};