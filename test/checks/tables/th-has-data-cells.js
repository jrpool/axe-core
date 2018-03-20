describe('th-has-data-cells', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return true each row header has a non-empty cell', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> <td>hello</td> </tr>' +
			'  <tr> <th>hi</th> <td>hello</td> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isTrue(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return true each non-empty column header has a cell', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>H</th> <th>H</th> </tr>' +
			'  <tr> <td>hi</td> <td>hello</td></tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isTrue(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return true if referred to with headers attr', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td headers="a">hi</td> <td headers="b">hello</td></tr>' +
			'  <tr> <th id="a">H</th> <th id="b">H</th> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isTrue(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return true if referred to with aria-labelledby', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td aria-labelledby="a">hi</td> <td aria-labelledby="b">hello</td></tr>' +
			'  <tr> <th id="a">H</th> <th id="b">H</th> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isTrue(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return true if the th element is empty', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th></th> <th></th> </tr>' +
			'  <tr> <th></th> <th></th> </tr>' +
			'</table>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isTrue(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return true when the td has a content element', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> <td><input type="text"></td> </tr>' +
			'  <tr> <th>hi</th> <td><textarea></textarea></td> </tr>' +
			'  <tr> <th>hi</th> <td><select><option>a</option></select></td> </tr>' +
			'  <tr> <th>hi</th> <td><img src="" alt="foo"></td> </tr>' +
			'  <tr> <th>hi</th> <td><video></video></td> </tr>' +
			'  <tr> <th>hi</th> <td><audio></audio></td> </tr>' +
			'  <tr> <th>hi</th> <td><span role="img"></span></td> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isTrue(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return undefined if a th has no data cells', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> </tr>' +
			'  <tr> <th>hi</th> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isUndefined(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return undefined if all data cells are empty', function (){
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> <td></td> </tr>' +
			'  <tr> <th>hi</th> <td></td> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isUndefined(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return undefined if a td with role=columnheader is used that has no data cells', function (){
		fixture.innerHTML =
			'<table id="fail4">' +
			'  <tr> <td>aXe</td> <td role="columnheader">AXE</th> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('table');
		assert.isUndefined(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});

	it('should return true if table has role="presentation"', function () {
		var params = checkSetup('<table role="presentation" id="target">' +
			'  <tr> <th>hi</th> <td></td> </tr>' +
			'  <tr> <th>hi</th> <td></td> </tr>' +
			'</table>');

		assert.isTrue(checks['th-has-data-cells'].evaluate.apply(checkContext, params));
	});

	it('should return true if table has role="none"', function () {
		var params = checkSetup('<table role="none" id="target">' +
			'  <tr> <th>hi</th> <td></td> </tr>' +
			'  <tr> <th>hi</th> <td></td> </tr>' +
			'</table>');

		assert.isTrue(checks['th-has-data-cells'].evaluate.apply(checkContext, params));
	});

	(shadowSupport ? it : xit)('recognizes shadow tree content', function () {
		fixture.innerHTML = '<div id="shadow"> <b>data</b> </div>';
		var shadow = fixture.querySelector('#shadow').attachShadow({ mode: 'open' });
		shadow.innerHTML =
			'<table>' +
			'  <tr> <th> header </th> </tr>' +
			'  <tr> <td><slot></slot></td> </tr>' +
			'</table>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = axe.utils.querySelectorAll(axe._tree, 'table')[0].actualNode;
		assert.isTrue(checks['th-has-data-cells'].evaluate.call(checkContext, node));
	});
});
