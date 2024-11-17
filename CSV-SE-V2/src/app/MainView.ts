import * as vscode from 'vscode';
import * as ejs from 'ejs';
import * as path from 'path';
import { extractSymbols } from '../utils/symbolExtractor';


export function create_web(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        'sourceVisualizer', // Identifies the type of the webview. Used internally
        'Source Visualizer', // Title of the panel displayed to the user
        {preserveFocus: true, viewColumn: vscode.ViewColumn.Beside}, // Editor column to show the new webview panel in
    );

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

async function getWebViewSourceEJS(context: vscode.ExtensionContext, new_doc_symbols: any | undefined): Promise<string> {
    const filepath = context.asAbsolutePath(path.join('src', 'views', 'viewhtmlTemplate.ejs'));
    console.log(new_doc_symbols.length);
    let ejs_view = await ejs.renderFile(filepath, { "data": new_doc_symbols }).then(data => { return data; });

    return ejs_view;
}
