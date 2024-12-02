// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as WebViewModule from './app/MainView';
// import * as WebViewModule from './app/WebView';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
import * as symbolExtractor from './utils/symbolExtractor';
import * as extEvents from './utils/extEvents';
import { SidebarProvider, Dependency } from './app/sideBarView';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
	
	// sidebar view
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0)) 
	? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
	
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerTreeDataProvider(
			"chrubeanie-sidebar",
			sidebarProvider
		)
	);
	
	
	let isExtensionActive = true;
	let symbolsClass = new symbolExtractor.DocumentSymbolProviderCustom();
    context.subscriptions.push(
		// activates the source visualizer
        vscode.commands.registerCommand('CSV-SE-V2.Chrubeanie-Source-Visualizer-V2', async () => {
			vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Activated.');
            // The code you place here will be executed every time your command is executed
			
            // INFO: Creates the panel with local extension path to render templates
			const panel = WebViewModule.create_web(context);
			
			
			let activeDocument = vscode.window.activeTextEditor?.document;
			
			if (activeDocument) {
				// let symbols = symbolExtractor.get_symbols(activeDocument.uri);
				// console.log(symbols);
				const visibleTextEditors = vscode.window.visibleTextEditors;
				console.log(visibleTextEditors.map);
				visibleTextEditors.forEach(async editor => {
					console.log(`Visible editor: ${editor.document.fileName}`);
					let newdoc = await symbolsClass.provideDocumentSymbols(editor.document, new vscode.CancellationTokenSource().token);
					console.log(newdoc);
				});
			} else {
				vscode.window.showErrorMessage('No active document found.');
			}
			panel.onDidDispose(() => {
				console.log("disposing webview");
			}, null, context.subscriptions);
			
			// gets all the active text editors in the workspace when active is changed
			context.subscriptions.push(
				vscode.window.onDidChangeVisibleTextEditors(async (response) => {
					console.log("length: " + response.length);
					panel.webview.postMessage({ command: 'Editor Changed.' });
					activeDocument = response[0]?.document;
					vscode.window.showInformationMessage('Document Changed');
					panel.title = activeDocument?.fileName || "No Document Open";
					console.log(activeDocument?.fileName);
					
					
					if (activeDocument) {
						await symbolsClass.provideDocumentSymbols(activeDocument, new vscode.CancellationTokenSource().token);
						console.log(symbolsClass);
					} else {
						vscode.window.showErrorMessage('No active document found.');
					}
					
					console.log(`Document Changed push: ${response[0]?.document.fileName}`);
					const allDocuments = vscode.workspace.textDocuments;
					allDocuments.forEach(doc => {
						console.log(`Open document2: ${doc.fileName}`);
					
							let data_changes = async () => {
								const visibleTextEditors = vscode.window.visibleTextEditors;
								visibleTextEditors.forEach(async editor => {
									console.log(`Visible editor: ${editor.document.fileName}`);
									let newdoc =  await symbolsClass.provideDocumentSymbols(editor.document,new vscode.CancellationTokenSource().token);
									console.log(newdoc);
								});
							};
							data_changes();
							
						
					});
					
				}));
			
			panel.webview.html = WebViewModule.getWebViewSourceVisual(context);
			vscode.window.showInformationMessage('Webview Created');
        }),
		

    );
	  // Register the command to stop the extension
	context.subscriptions.push(
        vscode.commands.registerCommand('CSV-SE-V2.stopExtension', () => {
            if (!isExtensionActive) {
                vscode.window.showWarningMessage('Extension is already stopped.');
                return;
            }

            // Perform cleanup and resource release
            deactivate();
            isExtensionActive = false;
            vscode.window.showInformationMessage('Extension has been stopped.');
        })
		
    );
	
}


// This method is called when your extension is deactivated
export function deactivate() {
    console.log("deactivate");
	vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Deactivated.');
}

export let context: vscode.ExtensionContext;

