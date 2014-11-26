var css = require('./css');

css.prefix = require('./prefix');

var selection = require('./selection');
css.enableSelection = selection.enable;
css.disableSelection = selection.disable;

css.paddings = require('./paddings');
css.margins = require('./margins');
css.borders = require('./borders');

css.offsets = require('./offsets');

css.parseValue = require('./parse-value');

css.isFixed = require('./is-fixed');

css.scrollbar = require('./scrollbar');

var hasScroll = require('./has-scroll');
css.hasScrollX = hasScroll.x;
css.hasScrollY = hasScroll.y;

css.Rect = require('./Rect');


/**
 * @module mucss
 */
module.exports = css;