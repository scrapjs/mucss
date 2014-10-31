var css = require('../index.js');

describe('MicroCSS', function(){
	it('Set translate3d', function(){
		var a = document.createElement('div');
		var value = 'translate3d(0px, 0px, 0px)';
		css(a, {
			'transform': value
		});

		assert.equal(css(a,'transform'), value);
	});

	it('selection on/off', function(){
		var a = document.createElement('div');
		css.disableSelection(a);
		assert.ok(a.getAttribute('unselectable'));

		css.enableSelection(a);
		assert.notOk(a.getAttribute('unselectable'));
	});

	it("paddings", function(){
		var a = document.createElement('a');
		a.style.padding = '10px 20px';
		document.body.appendChild(a);

		var paddings = css.paddings(a);
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

		var margins = css.margins(a);
		assert.deepEqual(margins, {
			top: 10,
			bottom: 10,
			left: 20,
			right: 20
		});
	});

	it("offsets", function(){
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

		var offsets = css.offsets(a);
		assert.equal(offsets.top, 210);
		assert.equal(offsets.left, 310);
		assert.equal(offsets.bottom, 530);
		assert.equal(offsets.right, 1130);
	});

	it("parseValue", function(){
		assert.equal(css.parseValue(0), 0);
		assert.equal(css.parseValue('auto'), 0);
		assert.equal(css.parseValue('10px'), 10);
		assert.equal(css.parseValue('10em'), 10);
		assert.equal(css.parseValue('10.5em'), 10.5);
	});

	it("css apply/clear", function(){
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

	it("isFixed", function(){
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

	it('z-index', function(){
		var a = document.createElement('div');
		css(a, 'z-index', 1);
		assert.equal(css(a, 'z-index'), 1);
		css(a, {'z-index': 2});
		assert.equal(css(a, 'z-index'), 2);
	});
})