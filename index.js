/**
 * mucss entry.
 * Contains all the submodules and bindings.
 * It is wiser to include only needed submodules though.
 * See submodules for details.
 *
 * @module mucss.
 */

var css = require('./css');
css.prefix = require('./prefix');
css.selection = require('./selection');
css.enableSelection = css.selection.enable;
css.disableSelection = css.selection.disable;
css.paddings = require('./paddings');
css.margins = require('./margins');
css.borders = require('./borders');
css.offsets = require('./offsets');
css.parseValue = require('./parse-value');
css.isFixed = require('./is-fixed');
css.scrollbar = require('./scrollbar');
css.hasScroll = require('./has-scroll');
css.hasScrollX = css.hasScroll.x;
css.hasScrollY = css.hasScroll.y;
css.Rect = require('./Rect');
css.getTranslate = require('./translate');
css.windowScroll = require('./window-scroll');


/**
 * @module mucss
 */
module.exports = css;