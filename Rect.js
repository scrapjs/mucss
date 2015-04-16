/**
 * Simple rect constructor.
 * It is just faster and smaller than constructing an object.
 *
 * @module mucss/Rect
 *
 * @param {number} l left
 * @param {number} t top
 * @param {number} r right
 * @param {number} b bottom
 * @param {number}? w width
 * @param {number}? h height
 *
 * @return {Rect} A rectangle object
 */
module.exports = function Rect (l,t,r,b,w,h) {
	this.top=t||0;
	this.bottom=b||0;
	this.left=l||0;
	this.right=r||0;
	if (w!==undefined) this.width=w||this.right-this.left;
	if (h!==undefined) this.height=h||this.bottom-this.top;
};