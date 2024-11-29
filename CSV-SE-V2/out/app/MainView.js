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
exports.RenderingFunctions = void 0;
exports.create_web = create_web;
exports.MainView = MainView;
exports.getWebViewSourceVisual = getWebViewSourceVisual;
const vscode = __importStar(require("vscode"));
const ejs = __importStar(require("ejs"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const symbolExtractor_1 = require("../utils/symbolExtractor");
const ext = vscode.extensions.getExtension('CSV-SE-V2');
// creates the webview panel
function create_web(context) {
    const panel = vscode.window.createWebviewPanel('sourceVisualizer', // Identifies the type of the webview. Used internally
    'Source Visualizer', // Title of the panel displayed to the user
    { preserveFocus: true, viewColumn: vscode.ViewColumn.Beside });
    panel.webview.html = getWebViewSourceVisual(context);
    // panel.webview.html = getWebViewSourceEJS(context, undefined);
    vscode.window.showInformationMessage('Webview Created');
    return panel;
}
async function MainView(document) {
    let data_changes = await (0, symbolExtractor_1.extractSymbols)(document);
    console.log(data_changes);
    vscode.window.showInformationMessage(document.fileName);
    // let dynamic_view = await getWebViewSourceEJS(context, data_changes);
    // return dynamic_view;
}
class RenderingFunctions {
    constructor() {
        let context = ext?.activate();
    }
    getView() {
        // let new_view;
        // async () => {
        //     new_view = await this.getWebViewSourceEJS(context,undefined);
        // }
        // return new_view;
        return "test";
    }
    async getWebViewSourceEJS(context, new_doc_symbols) {
        // const symbol = new MyDocumentSymbolProvider();
        // const new_doc_symbols = await symbol.provideDocumentSymbols(new_doc_symbols, new vscode.CancellationTokenSource().token);
        const filepath = context.asAbsolutePath(path.join('src', 'views', 'webViewhtml.ejs'));
        console.log(new_doc_symbols.length);
        let ejs_view = await ejs.renderFile(filepath, { "data": new_doc_symbols }).then(data => { return data; });
        return ejs_view;
    }
}
exports.RenderingFunctions = RenderingFunctions;
// temporary web page render until custom panel is complete
// TODO: get rid of this static html page and only load the dynamic template render
function getWebViewSourceVisual(context) {
    const filepath = context.asAbsolutePath(path.join('src', 'views', 'webViewhtml.ejs'));
    let html_view = fs.readFileSync(filepath, 'utf-8');
    return html_view;
}
//# sourceMappingURL=MainView.js.map