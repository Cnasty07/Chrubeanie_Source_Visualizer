"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
// TODO: need to finish the test cases after basic functions are implemented
// test case 1
suite('Extensions for Source Code Visualizer Test Suite', () => {
    suiteSetup(() => {
        vscode.window.showInformationMessage('Start all tests.');
    });
    suiteTeardown(() => {
        vscode.window.showInformationMessage('All tests completed.');
    });
    // test case 1: Activating and loading the extension. | Use-case 1: Load extension: Loads source code, Parses it, and Displays it in webview and node tree
    describe('Test case 1, activate and show', () => {
        it('Should load source code from active editor', () => {
            assert.strictEqual(1, 1);
        });
        test('Sample test', () => {
            assert.strictEqual(-1, [1, 2, 3].indexOf(5));
            assert.strictEqual(-1, [1, 2, 3].indexOf(0));
        });
    });
    // test case 2: Interaction. |  Use-case: 2: Interact with webview: Click on a node in the webview, and the corresponding code block is highlighted in the editor.
    describe("Test case 2, Interact with webview", () => {
        it('', () => {
            assert.strictEqual(1, 1);
        });
    });
    // test case 3: 
    describe("Test case 1, Open/Close Extension", () => {
        it('Should Open the extensions and activate it, then close it.', () => {
            assert.strictEqual(1, 1);
        });
    });
    describe("Test case 2, Load Source Code", () => {
        it('Should Pull the data from the open window for source code', () => {
            assert.strictEqual(1, 1);
        });
    });
    describe("Test case 3, Parse Source Code", () => {
    });
    describe("Test case 4, Display Source Code", () => {
    });
});
//# sourceMappingURL=extension.test.js.map