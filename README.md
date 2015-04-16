# Micro CSS [![Build Status](https://travis-ci.org/dfcreative/mucss.svg?branch=master)](https://travis-ci.org/dfcreative/mucss) [![Code Climate](https://codeclimate.com/github/dfcreative/mucss/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/mucss)

CSS utils for lightweight components development.

```
$ npm install mucss
```

Include the whole lib:

```js
var css = require('mucss');
css(el, {top: 100});
```


or include only submodules:

```js
var css = require('mucss/css');
var offsets = require('mucss/offsets');
var margins = require('mucss/margins');

var marginTop = margins(el).top;
```

## API

### `css(el, { transform: 'translate3d(10px,10px,0)' })`

Apply set of css rules to the element, automatically prefixed. Numbers are automatically converted to `px`. The same as `$.css` in jQuery.

### `css(el, 'transform')`
Get style property value, properly prefixed.

### `offsets(el)`
Get absolute offsets relative to the document, including `position: fixed` detection.

### `paddings(el)`
Get element paddings.

### `margins(el)`
Get element margins.

### `borders(el)`
Get element border widths.

### `parseValue(str)`
Parse units value.

### `selection.enable(el)`, `selection.disable(el)`
Set & unset element selectability.

### `prefix`
Current browser CSS prefixes object.

### `scrollbar`
A scrollbar size.

### `isFixed(el)`
Whether element is in fixed element or is fixed itself.

### `hasScroll.x()`, `hasScroll.y()`
Whether document has horizontal (x) or vertical (y) scrollbar.

### `isInViewport(el)`
Whether element is in the viewport.

### `getTranslate(el)`
Parse translate3d property of an element, if any.


[![NPM](https://nodei.co/npm/mucss.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mucss/)