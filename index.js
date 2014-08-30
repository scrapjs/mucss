module.exports = css;


var win = window;


/** Get clean style */
var fakeStyle = document.createElement('div').style;


/** Detect vendor prefix */
var prefix = css['prefix'] = (function() {
	var regex = /^(webkit|moz|ms|O|khtml)[A-Z]/, prop;
	for (prop in fakeStyle) {
		if (regex.test(prop)) {
			return prop.match(regex)[1];
		}
	}
	return '';
}());


/** Prevent you know what */
function pd(e){
	e.preventDefault();
}


/**
 * Disable or Enable any selection possibilities for an element
 *
 * @param    {Element}   $el   Target to make unselectable
 *
 * @return   {[type]}   [description]
 */

css['disableSelection'] = function($el){
	css($el, {
		'user-select': 'none',
		'user-drag': 'none',
		'touch-callout': 'none'
	});
	$el.setAttribute('unselectable', 'on');
	$el.addEventListener('selectstart', pd);
};
css['enableSelection'] = function($el){
	css($el, {
		'user-select': null,
		'user-drag': null,
		'touch-callout': null
	});
	$el.removeAttribute('unselectable');
	$el.removeEventListener('selectstart', pd);
};


/**
 * Return paddings of an element
 *
 * @param    {Element}   $el   An element to calc paddings
 *
 * @return   {Object}   Paddings object {top:n, bottom:n, left:n, right:n}
 */

css['paddings'] = function($el){
	var style = getComputedStyle($el);

	return {
		top: parseValue(style.paddingTop),
		left: parseValue(style.paddingLeft),
		bottom: parseValue(style.paddingBottom),
		right: parseValue(style.paddingRight)
	};
};


/**
 * Return paddings of an element
 *
 * @param    {Element}   $el   An element to calc paddings
 *
 * @return   {Object}   Paddings object {top:n, bottom:n, left:n, right:n}
 */

css['margins'] = function($el){
	var style = getComputedStyle($el);

	return {
		top: parseValue(style.marginTop),
		left: parseValue(style.marginLeft),
		bottom: parseValue(style.marginBottom),
		right: parseValue(style.marginRight)
	};
};


/** Returns parsed css value */
function parseValue(str){
	str += '';
	return ~~str.slice(0,-2);
}
css['parseValue'] = parseValue;


/**
 * Return absolute offsets
 *
 * @param    {Element}   el   A target
 *
 * @return   {Object}   Offsets object with trbl, fromRight, fromLeft
 */

css['offsets'] = function(el){
	if (!el) return;

	var cRect;

	try {
		cRect = el.getBoundingClientRect();
	} catch (e) {
		cRect = {
			top: el.clientTop,
			left: el.clientLeft
		};
	}

	//whether element is or is in fixed
	var isNotFixed = 0, parentEl = el;
	while (parentEl && isNotFixed) {
		isNotFixed = getComputedStyle(parentEl).position === 'fixed' ? 0 : 1;
		parentEl = el.parentNode;
	}

	return {
		top: cRect.top + (isNotFixed && win.pageYOffset),
		left: cRect.left + (isNotFixed && win.pageXOffset),
		width: el.offsetWidth,
		height: el.offsetHeight,
		bottom: cRect.top + (isNotFixed && win.pageYOffset) + el.offsetHeight,
		right: cRect.left + (isNotFixed && win.pageXOffset) + el.offsetWidth,
		fromRight: win.innerWidth - cRect.left - el.offsetWidth,
		fromBottom: (win.innerHeight + (isNotFixed && win.pageYOffset) - cRect.top - el.offsetHeight)
	};
};


/**
 * Apply styles to an element.
 * Main function returned from the module.
 *
 * @param    {Element}   el   An element to apply styles
 * @param    {Object}   obj   Set of style rules
 *
 */

function css(el, obj){
	if (!el || !obj) return;
	var propName;

	//return value, if string passed
	if (typeof obj === 'string') {
		propName = fakeStyle[prefix + obj] !== undefined ? (prefix + obj) : obj;
		return el.style[propName];
	}

	for (var name in obj){
		propName = fakeStyle[prefix + name] !== undefined ? (prefix + name) : name;

		//convert numbers to px
		if (typeof obj[name] === 'number') obj[name] += 'px';

		if (obj[name]) {
			el.style[propName] = obj[name];
		} else {
			el.style[propName] = '';
		}
	}
}