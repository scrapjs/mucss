var css = require('../index');

describe('MicroCSS', function(){
	it('Get proper prefix', function(){
		assert.equal(css.prefix,'');
	});
})