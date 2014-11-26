var mucss = require('../index');
var assert = require('assert');


describe('MicroCSS', function(){
	it('Set translate3d', function(){
		var a = document.createElement('div');
		var value = 'translate3d(0px, 0px, 0px)';
		mucss(a, {
			'transform': value
		});

		assert.equal(mucss(a,'transform'), value);
	});

	it('selection on/off', function(){
		var a = document.createElement('div');
		mucss.disableSelection(a);
		assert.ok(a.getAttribute('unselectable'));

		mucss.enableSelection(a);
		assert.ok(!a.getAttribute('unselectable'));
	});

	it("paddings", function(){
		var a = document.createElement('a');
		a.style.padding = '10px 20px';
		document.body.appendChild(a);

		var paddings = mucss.paddings(a);
		assert.deepEqual(paddings, {
			top: 10,
			bottom: 10,
			left: 20,
			right: 20
		});
	});

	it("margins", function(){
		var a = document.createElement('a');
		a.style.margin = '10px 20px';
		document.body.appendChild(a);

		var margins = mucss.margins(a);
		assert.deepEqual(margins, {
			top: 10,
			bottom: 10,
			left: 20,
			right: 20
		});
	});

	it("offsets", function(){
		var a = document.createElement('a');

		mucss(a, {
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

		var offsets = mucss.offsets(a);
		assert.equal(offsets.top, 210);
		assert.equal(offsets.left, 310);
		assert.equal(offsets.bottom, 530);
		assert.equal(offsets.right, 1130);
	});

	it("parseValue", function(){
		assert.equal(mucss.parseValue(0), 0);
		assert.equal(mucss.parseValue('auto'), 0);
		assert.equal(mucss.parseValue('10px'), 10);
		assert.equal(mucss.parseValue('10em'), 10);
		assert.equal(mucss.parseValue('10.5em'), 10.5);
	});

	it("mucss apply/clear", function(){
		var a = document.createElement('div');
		mucss(a, {
			'top': 100
		});

		assert.equal(a.style.top, '100px');

		mucss(a, {top: null});
		assert.equal(a.style.top, '');

		mucss(a, 'left', 200);
		assert.equal(a.style.left, '200px');
	});

	it("isFixed", function(){
		var a = document.createElement('div');
		a.innerHTML = '<div><div></div></div>';
		a.style.position = 'fixed';
		document.body.appendChild(a);

		assert.equal(mucss.isFixed(a), true);
		assert.equal(mucss.isFixed(a.firstChild), true);
		assert.equal(mucss.isFixed(a.firstChild.firstChild), true);
		assert.equal(mucss.isFixed(a.parentNode), false);
		assert.equal(mucss.isFixed(document), false);
		assert.equal(mucss.isFixed(window), true);
	});

	it('z-index', function(){
		var a = document.createElement('div');
		mucss(a, 'z-index', 1);
		assert.equal(mucss(a, 'z-index'), 1);
		mucss(a, {'z-index': 2});
		assert.equal(mucss(a, 'z-index'), 2);
	});
})