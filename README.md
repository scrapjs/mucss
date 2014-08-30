#### Micro CSS

Vital CSS utils useful for lightweight components development and if you care, it is only 784 bytes gzipped.

```
$ npm install mucss
```

```js
var css = require('mucss');
```

* `css(el, {transform:'translate3d(10px,10px,0)'})` - apply set of css rules to the element, automatically prefixed.
* `css(el, 'transform')` - get style property value, properly prefixed.
* `css.offsets(el)` - get absolute offsets relative to the document, including `position: fixed` detection.
* `css.paddings(el)` - get element paddings.
* `css.margins(el)` - get element margins.
* `css.parseValue(str)` - parse units value.
* `css.enableSelection(el)`, `css.disableSelection(el)` - set element selectable.
* `css.prefix` - current browser CSS prefix.