var css = require('../index');
var assert = require('assert');
var test = require('tst');

test('Set translate3d', function () {
	var a = document.createElement('div');
	var value = 'translate3d(0px, 0px, 0px)';
	css(a, {
		'transform': value
	});

	assert.equal(css(a,'transform'), value);
});

test('selection on/off', function () {
	var a = document.createElement('div');
	css.disableSelection(a);
	assert.ok(a.getAttribute('unselectable'));

	css.enableSelection(a);
	assert.ok(!a.getAttribute('unselectable'));
});

test("padding", function () {
	var a = document.createElement('a');
	a.style.padding = '10px 20px';
	document.body.appendChild(a);

	var padding = css.padding(a);
	assert.deepEqual(padding, {
		top: 10,
		bottom: 10,
		left: 20,
		right: 20,
		height: 0,
		width: 0
	});
});

test("margin", function () {
	var a = document.createElement('a');
	a.style.margin = '10px 20px';
	document.body.appendChild(a);

	var margin = css.margin(a);
	assert.deepEqual(margin, {
		top: 10,
		bottom: 10,
		left: 20,
		right: 20,
		width: 0,
		height: 0
	});
});

test("offset", function () {
	var a = document.createElement('a');

	css(a, {
		margin: '10px',
		padding: '10px',
		position: 'absolute',
		top: 200,
		left: 300,
		width: 800,
		height: 300
	});
	document.body.appendChild(a);
	var r = a.getBoundingClientRect();

	var offset = css.offset(a);
	assert.equal(offset.top, 210);
	assert.equal(offset.left, 310);
	assert.equal(offset.bottom, 530);
	assert.equal(offset.right, 1130);

	document.body.removeChild(a);
});

test("parseValue", function () {
	assert.equal(css.parseValue(0), 0);
	assert.equal(css.parseValue('auto'), 0);
	assert.equal(css.parseValue('10px'), 10);
	assert.equal(css.parseValue('10em'), 10);
	assert.equal(css.parseValue('10.5em'), 10.5);
	assert.equal(css.parseValue('-10.5em'), -10.5);
	assert.equal(css.parseValue('-10.5rem'), -10.5);
});

test("mucss apply/clear", function () {
	var a = document.createElement('div');
	css(a, {
		'top': 100
	});

	assert.equal(a.style.top, '100px');

	css(a, {top: null});
	assert.equal(a.style.top, '');

	css(a, 'left', 200);
	assert.equal(a.style.left, '200px');
});

test("isFixed", function () {
	var a = document.createElement('div');
	a.innerHTML = '<div><div></div></div>';
	a.style.position = 'fixed';
	document.body.appendChild(a);

	assert.equal(css.isFixed(a), true);
	assert.equal(css.isFixed(a.firstChild), true);
	assert.equal(css.isFixed(a.firstChild.firstChild), true);
	assert.equal(css.isFixed(a.parentNode), false);
	assert.equal(css.isFixed(document), false);
	assert.equal(css.isFixed(window), true);
});

test('has-scroll', function () {
	assert.ok(!css.hasScroll.x(document.documentElement));
});

test('z-index', function () {
	var a = document.createElement('div');
	css(a, 'z-index', 1);
	assert.equal(css(a, 'z-index'), 1);
	css(a, {'z-index': 2});
	assert.equal(css(a, 'z-index'), 2);
});


test('parse translate3d', function () {
	var a = document.createElement('div');
	css(a, 'transform', 'scale(12,3) translate3d(12px, 4px, 3px)');
	var res = css.getTranslate(a);
	assert.deepEqual(res, [12, 4, 3]);

	css(a, 'transform', 'scale(12) translate(12px, 4em)');
	var res = css.getTranslate(a);
	assert.deepEqual(res, [12, 4]);
});

test('rect', function () {
	var rect = css.Rect(10, 20, 20, 30);
	assert.equal(rect.width, 10);
	assert.equal(rect.height, 10);
});