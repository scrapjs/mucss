#### Micro CSS

Vital CSS utils useful for lightweight components development and if you care, it is only 784 bytes gzipped.

```
$ npm install mucss
```

```js
var css = require('mucss');
```

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
