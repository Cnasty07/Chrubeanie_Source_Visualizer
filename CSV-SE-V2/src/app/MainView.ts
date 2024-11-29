import * as vscode from 'vscode';
import * as ejs from 'ejs';
import * as path from 'path';
import * as fs from 'fs';
import { extractSymbols } from '../utils/symbolExtractor';

const ext = vscode.extensions.getExtension('CSV-SE-V2');

// creates the webview panel
export function create_web(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        'sourceVisualizer', // Identifies the type of the webview. Used internally
        'Source Visualizer', // Title of the panel displayed to the user
        {preserveFocus: true, viewColumn: vscode.ViewColumn.Beside}, // Editor column to show the new webview panel in
    );
    panel.webview.html = getWebViewSourceVisual(context);
    // panel.webview.html = getWebViewSourceEJS(context, undefined);
    vscode.window.showInformationMessage('Webview Created');
    return panel;
}

export async function MainView(document: vscode.TextDocument) {
    
    let data_changes = await extractSymbols(document);
    console.log(data_changes);
    vscode.window.showInformationMessage(document.fileName);
    // let dynamic_view = await getWebViewSourceEJS(context, data_changes);
    // return dynamic_view;
}

export class RenderingFunctions {
    
    constructor() {
        let context = ext?.activate();
    }
    public getView(): string {
        // let new_view;
        // async () => {
        //     new_view = await this.getWebViewSourceEJS(context,undefined);
        // }
        // return new_view;
        return "test";
    }
    public async getWebViewSourceEJS(context: vscode.ExtensionContext, new_doc_symbols: any | undefined): Promise<string> {
        // const symbol = new MyDocumentSymbolProvider();
        // const new_doc_symbols = await symbol.provideDocumentSymbols(new_doc_symbols, new vscode.CancellationTokenSource().token);
        const filepath = context.asAbsolutePath(path.join('src', 'views', 'webViewhtml.ejs'));
        console.log(new_doc_symbols.length);
        let ejs_view = await ejs.renderFile(filepath, { "data": new_doc_symbols }).then(data => { return data; });

        return ejs_view;
    }
}

// temporary web page render until custom panel is complete
// TODO: get rid of this static html page and only load the dynamic template render
export function getWebViewSourceVisual(context: vscode.ExtensionContext): string {
    const filepath = context.asAbsolutePath(path.join('src', 'views', 'webViewhtml.ejs'));
    let html_view = fs.readFileSync(filepath, 'utf-8');
    return html_view;
}
