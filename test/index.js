var css = require('../index');

describe('MicroCSS', function(){
	it('Set translate3d', function(){
		var a = document.createElement('div');
		var value = 'translate3d(0,0,0)';
		css(a, {
			'transform': value
		});

		assert.equal(a.style[css.prefix + 'transform'], value);
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
		assert.equal(offsets.bottom, 540);
		assert.equal(offsets.right, 1140);
	});

	it("parseValue", function(){
		assert.equal(css.parseValue(0), 0);
		assert.equal(css.parseValue('auto'), 0);
		assert.equal(css.parseValue('10px'), 10);
		assert.equal(css.parseValue('10em'), 10);
	});

	it("css apply/clear", function(){
		var a = document.createElement('div');
		css(a, {
			'top': 100
		});

		assert.equal(a.style.top, '100px');

		css(a, {top: null});
		assert.equal(a.style.top, '');
	});
})