#### Micro CSS utils

This is useful for lightweight components development and if you care, it is < 0.5kb minified & gzipped.

```
$ npm install mucss
```

```js
var css = require('mucss');
```

* `css(el, object)` - apply set of css rules to the element, properly prefixed
* `css.offsets(el)` - get absolute offsets relative to the document
* `css.paddings(el)` - get element paddings
* `css.margins(el)` - get element margins
* `css.parseCSSValue(str)` - parse units value
* `css.enableSelection(el)`, `css.disableSelection(el)` - set element selectable
* `css.pefix` - current browser CSS prefix