# Micro CSS [![Build Status](https://travis-ci.org/dfcreative/mucss.svg?branch=master)](https://travis-ci.org/dfcreative/mucss) [![Code Climate](https://codeclimate.com/github/dfcreative/mucss/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/mucss) <a href="UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>

Vital CSS utils useful for lightweight components development (_<1kb gzipped_).


```
$ npm install mucss
```

Include the whole lib:

```js
var css = require('mucss');
css(el, {top: 100});
```


or include submodules:

```js
var css = require('mucss/css');
var offsets = require('mucss/offsets');
var margins = require('mucss/margins');

var marginsTop = margins(el).top;
```

# API

* `css(el, { transform: 'translate3d(10px,10px,0)' })` - apply set of css rules to the element, automatically prefixed. Numbers are automatically converted to `px`. The same as jQuery’s css.
* `css(el, 'transform')` - get style property value, properly prefixed.

* `offsets(el)` - get absolute offsets relative to the document, including `position: fixed` detection.
* `paddings(el)` - get element paddings.
* `margins(el)` - get element margins.
* `borders(el)` - get element border widths.
* `parseValue(str)` - parse units value.
* `enableSelection(el)`, `disableSelection(el)` - set & unset element selectable.
* `prefix` - current browser CSS prefixes object.
* `scrollbar` - a scrollbar size.
* `isFixed(el)` - whether element is in fixed element or is fixed itself.
* `hasScrollX()`, `hasScrollY()` - whether document has horizontal (x) or vertical (y) scrollbar.
* `isInViewport(el)` - whether element is in the viewport


[![NPM](https://nodei.co/npm/mucss.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mucss/)