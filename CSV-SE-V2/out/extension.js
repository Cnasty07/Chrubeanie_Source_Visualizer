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
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const ejs = __importStar(require("ejs"));
const path = __importStar(require("path"));
const symbolExtractor = __importStar(require("./utils/symbolExtractor"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    /* TODO:
        1. Add sidebar tree overview for workbench
        2. Create tables in html to output the DocumentSymbols
        3. Create separate modules for each script
    */
    context.subscriptions.push(vscode.commands.registerCommand('CSV-SE-V2.Chrubeanie-Source-Visualizer-V2', () => {
        vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Activated.');
        // The code you place here will be executed every time your command is executed
        // INFO: Creates the panel with local extension path to render templates
        const panel = vscode.window.createWebviewPanel('sourceVisualizer', // Identifies the type of the webview. Used internally
        'Source Visualizer', // Title of the panel displayed to the user
        { preserveFocus: true, viewColumn: vscode.ViewColumn.Beside }, // Editor column to show the new webview panel in
        {} // Webview options. More on these later.
        );
        // Add more functionality as needed
        let active_document = vscode.window.activeTextEditor?.document;
        // Add a webview refresh on events
        var active_editors = vscode.window.visibleTextEditors;
        // console.log(active_editors.map((editor) => editor.document.fileName));
        let DS;
        const cancelSource = new vscode.CancellationTokenSource();
        const token = cancelSource.token;
        const updateWebview = async () => {
            active_editors = vscode.window.visibleTextEditors;
            console.log(active_editors);
            console.log("active editors above");
            let DS = { scheme: "file", language: 'python' };
            console.log(DS);
            vscode.window.onDidChangeActiveTextEditor((response) => {
                active_document = response?.document;
                vscode.window.showInformationMessage('Document Changed');
                panel.title = active_document?.fileName || "No Document Open";
                console.log(active_document?.fileName);
                // let active_symbols = DS.provideDocumentSymbols(active_document, token);
            });
            if (active_document) {
                let data_changes = symbolExtractor.extractSymbols(active_editors[0].document);
                console.log(data_changes);
                vscode.window.showInformationMessage(active_editors[0].document.fileName);
                let dynamic_view = await getWebViewSourceEJS(context, data_changes);
                panel.webview.html = dynamic_view;
            }
            else {
                vscode.window.showErrorMessage('No active document found.');
            }
        };
        // Set the webview's initial html content
        updateWebview();
        const intr = setInterval(updateWebview, 5000);
        panel.onDidDispose(() => {
            clearInterval(intr);
        }, null, context.subscriptions);
        panel.webview.html = getWebViewSourceVisual(context);
        vscode.window.showInformationMessage('Webview Created');
    }));
}
// temporary web page render until custom panel is complete
// TODO: get rid of this static html page and only load the dynamic template render
function getWebViewSourceVisual(context) {
    const filepath = context.asAbsolutePath(path.join('src', 'views', 'webViewhtml.ejs'));
    let html_view = fs.readFileSync(filepath, 'utf-8');
    return html_view;
}
// TODO: create new module for this and explore object depth per Symbol for table
// INFO: This function creates an ejs template render and feeds it data from the vscode extension api 
async function getWebViewSourceEJS(context, new_doc_symbols) {
    const filepath = context.asAbsolutePath(path.join('src', 'views', 'viewhtmlTemplate.ejs'));
    console.log(new_doc_symbols.length);
    let ejs_view = await ejs.renderFile(filepath, { "data": new_doc_symbols }).then(data => { return data; });
    return ejs_view;
}
// This method is called when your extension is deactivated
function deactivate() {
    console.log("deactivate");
    vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Deactivated.');
}
//# sourceMappingURL=extension.js.map