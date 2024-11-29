// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as webview_module from './app/MainView';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
import * as symbolExtractor from './utils/symbolExtractor';
import * as extEvents from './utils/extEvents';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
	let isExtensionActive = true;
	

    context.subscriptions.push(
		// activates the source visualizer
        vscode.commands.registerCommand('CSV-SE-V2.Chrubeanie-Source-Visualizer-V2', () => {
            vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Activated.');
            // The code you place here will be executed every time your command is executed

            // INFO: Creates the panel with local extension path to render templates
			const panel = webview_module.create_web(context);
			
            // Add more functionality as needed
			let active_document = vscode.window.activeTextEditor?.document;
		
			// let allDocuments = vscode.workspace.textDocuments;
			// allDocuments.forEach(doc => {
			// 	console.log(`Open document: ${doc.fileName}`);
			// });
			let activeDocument = vscode.window.activeTextEditor?.document;
			
			if (activeDocument) {
				let symbols = symbolExtractor.get_symbols(activeDocument.uri);
				console.log(symbols);
				const templatePath = path.join(context.extensionPath, 'src','views', 'webViewhtml.ejs');
				// let rendering = new webview_module.RenderingFunctions();
				// const html = async () => {
				// 	return await rendering.getWebViewSourceEJS(context, symbols);
				// }
				// panel.webview.html = html();
			} else {
				vscode.window.showErrorMessage('No active document found.');
			}
			// webview panel event listeners
			panel.webview.onDidReceiveMessage(
				message => {
					switch (message.command) {
						case 'Editor Changed.':
							vscode.window.showErrorMessage(message.text);
							return;
					}
				},
				undefined,
				context.subscriptions
			);
			panel.onDidDispose(() => {
				console.log("disposing webview");
			}, null, context.subscriptions);
			// git cahnge
			
			// gets all the active text editors in the workspace when active is changed
			context.subscriptions.push(
				vscode.window.onDidChangeActiveTextEditor((response) => {
					panel.webview.postMessage({ command: 'Editor Changed.' });
					active_document = response?.document;
					vscode.window.showInformationMessage('Document Changed');
					panel.title = active_document?.fileName || "No Document Open";
					console.log(active_document?.fileName);
					

					if (activeDocument) {

						let symbols = symbolExtractor.get_symbols(activeDocument.uri);
						console.log(symbols);
					} else {
						vscode.window.showErrorMessage('No active document found.');
					}
					
					console.log(`Document Changed push: ${response?.document.fileName}`);
					const allDocuments = vscode.workspace.textDocuments;
					allDocuments.forEach(doc => {
						console.log(`Open document2: ${doc.fileName}`);
					
							let data_changes = async () => {
								
							
								let newdoc =  await symbolExtractor.extractSymbols(doc);
								console.log(newdoc);
							};
							data_changes();
							
						
					});
					
				}));
			
			panel.webview.html = webview_module.getWebViewSourceVisual(context);
			vscode.window.showInformationMessage('Webview Created');
        })
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


// TODO: create new module for this and explore object depth per Symbol for table
// INFO: This function creates an ejs template render and feeds it data from the vscode extension api 
async function getWebViewSourceEJS(context: vscode.ExtensionContext, new_doc_symbols: any): Promise<string> {
    const filepath = context.asAbsolutePath(path.join('src', 'views', 'viewhtmlTemplate.ejs'));
    console.log(new_doc_symbols.length);
    let ejs_view = await ejs.renderFile(filepath, { "data": new_doc_symbols }).then(data => { return data; });

    return ejs_view;
}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log("deactivate");
	vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Deactivated.');
}

