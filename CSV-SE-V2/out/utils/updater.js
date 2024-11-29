"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// will auto start and stop the interval updater when extension activated and deactivated
class Updater {
    intr = undefined;
    constructor() {
        let subscriptions = [];
        this.start();
        this.dispose();
    }
    start() {
        // this.intr = setInterval(() => {
        //     console.log('Interval');
        // }, 5000);
    }
    dispose() {
        if (this.intr) {
            clearInterval(this.intr);
        }
    }
}
//# sourceMappingURL=updater.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// will auto start and stop the interval updater when extension activated and deactivated
class Updater {
    intr = undefined;
    constructor() {
        let subscriptions = [];
        this.start();
        this.dispose();
    }
    start() {
        // this.intr = setInterval(() => {
        //     console.log('Interval');
        // }, 5000);
    }
    dispose() {
        if (this.intr) {
            clearInterval(this.intr);
        }
    }
}
// const updateWebview = async () => {
//     const allDocuments = vscode.workspace.textDocuments;
//     allDocuments.forEach(doc => {
//         console.log(`Open document: ${doc.fileName}`);
//     });
//     const activeDocument = vscode.window.activeTextEditor?.document;
//     if (activeDocument) {
//         const symbolProvider = new symbolExtractor.MyDocumentSymbolProvider();
//         const symbols = await symbolProvider.provideDocumentSymbols(activeDocument, new vscode.CancellationTokenSource().token);
//         const templatePath = path.join(context.extensionPath, 'views', 'dynamicTable.ejs');
//         const html = await ejs.renderFile(templatePath, { symbols });
//         panel.webview.html = html;
//     } else {
//         vscode.window.showErrorMessage('No active document found.');
//     }
//     active_editors = vscode.window.visibleTextEditors;
//     console.log(active_editors);
//     console.log("active editors above");
//     let DS: vscode.DocumentSelector = {scheme: "file", language: 'python' };
//     console.log(DS);
//     vscode.window.onDidChangeActiveTextEditor((response) => {
//         active_document = response?.document;
//         vscode.window.showInformationMessage('Document Changed');
//         panel.title = active_document?.fileName || "No Document Open";
//         console.log(active_document?.fileName);
//         // let active_symbols = DS.provideDocumentSymbols(active_document, token);
//     });
//     if (active_document) {
//         let data_changes = symbolExtractor.extractSymbols(active_editors[0].document);
//         console.log(data_changes);
//         vscode.window.showInformationMessage(active_editors[0].document.fileName);
//         let dynamic_view = await getWebViewSourceEJS(context, data_changes);
//         panel.webview.html = dynamic_view;
//     } else {
//         vscode.window.showErrorMessage('No active document found.');
//     }
// };
//# sourceMappingURL=updater.js.map