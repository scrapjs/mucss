module.exports = css;


var win = window, doc = document, root = doc.documentElement, body = doc.body;


/** Get clean style. */
var fakeStyle = doc.createElement('div').style;


/** Detect vendor prefix. */
var prefix = css.prefix = (function() {
	var regex = /^(webkit|moz|ms|O|khtml)[A-Z]/, prop;
	for (prop in fakeStyle) {
		if (regex.test(prop)) {
			return prop.match(regex)[1];
		}
	}
	return '';
}());


/** Prevent you know what. */
function pd(e){
	e.preventDefault();
}


/**
 * Disable or Enable any selection possibilities for an element.
 *
 * @param    {Element}   $el   Target to make unselectable.
 */

css.disableSelection = function($el){
	css($el, {
		'user-select': 'none',
		'user-drag': 'none',
		'touch-callout': 'none'
	});
	$el.setAttribute('unselectable', 'on');
	$el.addEventListener('selectstart', pd);
};
css.enableSelection = function($el){
	css($el, {
		'user-select': null,
		'user-drag': null,
		'touch-callout': null
	});
	$el.removeAttribute('unselectable');
	$el.removeEventListener('selectstart', pd);
};


/**
 * Return paddings of an element.
 *
 * @param    {Element}   $el   An element to calc paddings.
 * @return   {Object}   Paddings object `{top:n, bottom:n, left:n, right:n}`.
 */

css.paddings = function($el){
	if ($el === win) return new Rect();

	if (!($el instanceof Element)) throw Error('Argument is not an element');

	var style = win.getComputedStyle($el);

	return new Rect(
		parseCSSValue(style.paddingLeft),
		parseCSSValue(style.paddingTop),
		parseCSSValue(style.paddingRight),
		parseCSSValue(style.paddingBottom)
	);
};


/**
 * Return margins of an element.
 *
 * @param    {Element}   $el   An element which to calc margins.
 * @return   {Object}   Paddings object `{top:n, bottom:n, left:n, right:n}`.
 */

css.margins = function($el){
	if ($el === win) return new Rect();

	if (!($el instanceof Element)) throw Error('Argument is not an element');

	var style = win.getComputedStyle($el);

	return new Rect(
		parseCSSValue(style.marginLeft),
		parseCSSValue(style.marginTop),
		parseCSSValue(style.marginRight),
		parseCSSValue(style.marginBottom)
	);
};


/**
 * Return border widths of an element
 */
css.borders = function($el){
	if ($el === win) return new Rect;

	if (!($el instanceof Element)) throw Error('Argument is not an element');

	var style = win.getComputedStyle($el);

	return new Rect(
		parseCSSValue(style.borderLeftWidth),
		parseCSSValue(style.borderTopWidth),
		parseCSSValue(style.borderRightWidth),
		parseCSSValue(style.borderBottomWidth)
	);
};


/** Returns parsed css value. */
function parseCSSValue(str){
	str += '';
	return parseFloat(str.slice(0,-2)) || 0;
}
css.parseValue = parseCSSValue;


/**
 * Return absolute offsets of any target passed
 *
 * @param    {Element|window}   el   A target. Pass window to calculate viewport offsets
 * @return   {Object}   Offsets object with trbl, fromBottom, fromLeft.
 */

css.offsets = function(el){
	if (!el) throw Error('Bad argument');

	//calc client rect
	var cRect, result;

	//return vp offsets
	if (el === win) {
		result = new Rect(
			win.pageXOffset,
			win.pageYOffset
		);

		result.width = win.innerWidth - (css.hasScrollY() ? css.scrollbar : 0),
		result.height = win.innerHeight - (css.hasScrollX() ? css.scrollbar : 0)
		result.right = result.left + result.width;
		result.bottom = result.top + result.height;

		return result;
	}

	//FIXME: why not every element has getBoundingClientRect method?
	try {
		cRect = el.getBoundingClientRect();
	} catch (e) {
		cRect = new Rect(
			el.clientLeft,
			el.clientTop
		);
	}

	//whether element is or is in fixed
	var isFixed = css.isFixed(el);
	var xOffset = isFixed ? 0 : win.pageXOffset;
	var yOffset = isFixed ? 0 : win.pageYOffset;


	result = new Rect(
		cRect.left + xOffset,
		cRect.top + yOffset,
		cRect.left + xOffset + el.offsetWidth,
		cRect.top + yOffset + el.offsetHeight,
		el.offsetWidth,
		el.offsetHeight
	);

	return result;
};


/**
 * Detect whether element is placed to fixed container or fixed itself.
 *
 * @param {(Element|Object)} el Element to detect fixedness.
 *
 * @return {boolean} Whether element is nested.
 */

css.isFixed = function (el) {
	var parentEl = el;

	//window is fixed, btw
	if (el === win) return true;

	//unlike the doc
	if (el === doc) return false;

	while (parentEl) {
		if (win.getComputedStyle(parentEl).position === 'fixed') return true;
		parentEl = parentEl.offsetParent;
	}
	return false;
};


/**
 * Apply styles to an element. This is the module exports.
 *
 * @param    {Element}   el   An element to apply styles.
 * @param    {Object|string}   obj   Set of style rules or string to get style rule.
 */

function css(el, obj){
	if (!el || !obj) return;

	var name, value;

	//return value, if string passed
	if (typeof obj === 'string') {
		name = obj;

		//return value, if no value passed
		if (arguments.length < 3) {
			return el.style[prefixize(name)];
		}

		//set style, if value passed
		value = arguments[2] || '';
		obj = {};
		obj[name] = value;
	}

	for (name in obj){
		//convert numbers to px
		if (typeof obj[name] === 'number' && /left|right|bottom|top|width|height/i.test(name)) obj[name] += 'px';

		value = obj[name] || '';

		el.style[prefixize(name)] = value;
	}
}


/**
 * Return prefixized prop name, if needed.
 *
 * @param    {string}   name   A property name.
 * @return   {string}   Prefixed property name.
 */

function prefixize(name){
	var uName = name[0].toUpperCase() + name.slice(1);
	if (fakeStyle[name] !== undefined) return name;
	if (fakeStyle[prefix + uName] !== undefined) return prefix + uName;
	return '';
}


/**
 * Calc sb width
 *
 * @return {number} in pixels
 */
// Create the measurement node
var scrollDiv = doc.createElement("div");
css(scrollDiv,{
	width: 100,
	height: 100,
	overflow: 'scroll',
	position: 'absolute',
	top: -9999,
});
root.appendChild(scrollDiv);

/** the scrollbar width */
css.scrollbar = scrollDiv.offsetWidth - scrollDiv.clientWidth;

// Delete fake DIV
root.removeChild(scrollDiv);



/** window scrollbar detectors */
css.hasScrollX = function(){
	return win.innerHeight > root.clientHeight;
};
css.hasScrollY = function(){
	return win.innerWidth > root.clientWidth;
};


/** simple rect stub  */
function Rect(l,t,r,b,w,h){
	this.top=t||0;
	this.bottom=b||0;
	this.left=l||0;
	this.right=r||0;
	if (w!==undefined) this.width=w||this.right-this.left;
	if (h!==undefined) this.height=h||this.bottom-this.top;
}