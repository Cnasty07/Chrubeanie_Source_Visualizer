import * as vscode from 'vscode';
import * as ejs from 'ejs';
import * as path from 'path';
import * as fs from 'fs';
import {context} from '../extension'

export class MainViewPanel {
    public static currentPanel: MainViewPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel) {
        this._panel = panel;
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // this._panel.webview.html = this._getHtmlForWebview(context,undefined);
        this._panel.webview.html = this.defaultHTMl();
    }

    public static render() {
        if (MainViewPanel.currentPanel) {
            MainViewPanel.currentPanel._panel.reveal(vscode.ViewColumn.Beside);
        } else {
            const panel = vscode.window.createWebviewPanel(
                'sourceVisualizer',
                'Source Visualizer',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );

            MainViewPanel.currentPanel = new MainViewPanel(panel);
        }
    }
    public dispose() {
        MainViewPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    public defaultHTMl() {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Source Visualizer</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 10px;
            }
            h1 {
                color: #333;
            }
            .content {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Source Visualizer</h1>
        <div class="content">
            <p>This is the default content of the webview.</p>
        </div>
    </body>
    </html>`
    }
    // file that renders html view when doc symbols are 
    public async _getHtmlForWebview(context: vscode.ExtensionContext, new_doc_symbols: any | undefined) {
        const filepath = context.asAbsolutePath(path.join('src', 'views', 'webViewhtml.ejs'));
        try {
            console.log(new_doc_symbols.length);
            let ejs_view = await ejs.renderFile(filepath, { "data": new_doc_symbols }).then(data => { return data; });
            return  ejs_view;
            
        } catch (error) {
            return await ejs.render(filepath);
        }
        
    }

}