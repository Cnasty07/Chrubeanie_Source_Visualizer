import * as assert from 'assert';


// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

// TODO: need to finish the test cases after basic functions are implemented

// test case 1
suite('Extension Test Suite', () => {
	
	suiteTeardown(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
	
	test("Activate Extension Test", () => {
		assert.strictEqual(1, 1);
	});

	

	test("WebView Test", () => {
		assert.strictEqual(1, 1);
	});

	test("NodeTree Test", () => {
		assert.strictEqual(1, 1);
	});

	test("Interaction Test", () => {
		assert.strictEqual(1, 1);
	});

	test("Close Test", () => {
		assert.strictEqual(1, 1);
	});

});


// test case 2
