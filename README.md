# Micro CSS [![Build Status](https://travis-ci.org/dfcreative/mucss.svg?branch=master)](https://travis-ci.org/dfcreative/mucss)

Vital CSS utils useful for lightweight components development. Provides atomic-size css functions for easy include.

[![NPM](https://nodei.co/npm/mucss.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mucss/)


```
$ npm install mucss
```

```js
var css = require('mucss/css');
```

# API

* `css(el, { transform: 'translate3d(10px,10px,0)' })` - apply set of css rules to the element, automatically prefixed. Numbers are automatically converted to `px`.
* `css(el, 'transform')` - get style property value, properly prefixed.
* `css.offsets(el)` - get absolute offsets relative to the document, including `position: fixed` detection.
* `css.paddings(el)` - get element paddings.
* `css.margins(el)` - get element margins.
* `css.borders(el)` - get element border widths.
* `css.parseValue(str)` - parse units value.
* `css.enableSelection(el)`, `css.disableSelection(el)` - set & unset element selectable.
* `css.prefix` - current browser CSS prefix, e. g. `'webkit'`
* `css.isFixed(el)` - whether element is in fixed element or is fixed itself.
* `css.hasScrollX()`, `css.hasScrollY()` - whether document has horizontal (x) or vertical (y) scrollbar.



<a href="http://unlicense.org/UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="40"/></a>