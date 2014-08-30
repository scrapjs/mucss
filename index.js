module.exports = css;


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
		top: parseCSSValue(style.paddingTop),
		left: parseCSSValue(style.paddingLeft),
		bottom: parseCSSValue(style.paddingBottom),
		right: parseCSSValue(style.paddingRight)
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
		top: parseCSSValue(style.marginTop),
		left: parseCSSValue(style.marginLeft),
		bottom: parseCSSValue(style.marginBottom),
		right: parseCSSValue(style.marginRight)
	};
};


/** Returns parsed css value */
function parseCSSValue(str){
	return ~~str.slice(0,-2);
}
css['parseCSSValue'] = parseCSSValue;


/**
 * Return absolute offsets
 *
 * @param    {Element}   el   A target
 *
 * @return   {Object}   Offsets object with trbl, fromRight, fromLeft
 */

css['offsets'] = function(el){
	if (el) return {
		top: el.clientTop + win.pageYOffset,
		left: el.clientLeft + win.pageXOffset,
		width: el.offsetWidth,
		height: el.offsetHeight,
		bottom: el.clientTop + win.pageYOffset + el.offsetHeight,
		right: el.clientLeft + win.pageXOffset + el.offsetWidth,
		fromRight: win.innerWidth - el.clientLeft - el.offsetWidth,
		fromBottom: (win.innerHeight + win.pageYOffset - el.clientTop - el.offsetHeight)
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
	for (var name in obj){
		propName = fakeStyle[prefix + name] !== undefined ? prefix + name : name;
		if (obj[name]) {
			el.style[propName] = obj[name];
		} else {
			el.style[propName] = '';
		}
	}
}