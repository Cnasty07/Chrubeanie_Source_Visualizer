import * as vscode from 'vscode';


export class MainViewPanel {
    public static currentPanel: MainViewPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel) {
        this._panel = panel;
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.html = this._getHtmlForWebview();
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

    public _getHtmlForWebview() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>Source Visualizer</h1>
                <vscode-button id="click-button">Click me</vscode-button>
            </body>
            </html>
        `;
    }
}