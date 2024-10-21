// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const fs = require('fs');
const ejs = require('ejs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	/* TODO: 
		1. Add sidebar tree overview for workbench
		2. Create tables in html to output the DocumentSymbols
		3. Create seperate modules for each script 
	*/


	context.subscriptions.push(
		vscode.commands.registerCommand('CSV-SE.showSourceVisualizer', function () {
			vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Activated.');
			// The code you place here will be executed every time your command is executed

			// INFO: Creates the panel with local extension path to render templates
			const panel = vscode.window.createWebviewPanel(
				'SCActive',
				'Source Control Visualizer',
				vscode.ViewColumn.Two,
				{
					localResourceRoots: [vscode.Uri.joinPath(context.extensionUri,"./src/views")]
				}
			)

			const onDiskPath = vscode.Uri.joinPath(context.extensionUri,'src/views','viewHTML.html')
			// // const htmlsrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(onDiskPath))
			

			
			// INFO: Picks the open document from the vscode window to use when command is started
			let active_document = vscode.window.activeTextEditor
			
			// vscode.window.showTextDocument(active_document.document)
			// vscode.window.createTreeView("newTree")
			console.log(active_document.document.languageId)
			let new_doc = vscode.Uri.parse(active_document.document.fileName)
			panel.webview.html = getWebViewSourceVisual(context)
			
			
			// INFO: function for updating webview, currently set to every 5 seconds, retrieves new data if event is triggered
			const updateWebView = async () => {
				// checks if active editor changed to update the webview
				vscode.window.onDidChangeActiveTextEditor((response) => {
					active_document = response;
					vscode.window.showInformationMessage("Loading New Active Document. Please wait.")
					panel.title = active_document.document.languageId
					console.log(active_document.document.fileName)
					console.log()
				})
				// INFO: retrieves the symbols from the active document
				let DSP = await vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", new_doc).then((data) => { return data })
				
				let new_doc_symbols = DSP // converts array to object
				console.log("new symbols")
				console.log(await new_doc_symbols)
				
				/* IF using object
				// let new_doc_symbols = Object.assign({},DSP) // converts array to object
				// for (const key in new_doc_symbols) {
				// 	if (Object.prototype.hasOwnProperty.call(new_doc_symbols, key)) {
				// 		const element = new_doc_symbols[key];
				// 		console.log(element)
				// 	}
				// }
				*/

				//default webview
				panel.webview.html = getWebViewSourceVisual(context)
				let update_view = await getWebViewSourceEJS(context,new_doc_symbols)
				
				panel.webview.html  = update_view
				
				
				console.log(`${new_doc_symbols["4"].name} updated`)
			}

			updateWebView() // invokation for updating webview  panel

			const intr = setInterval(updateWebView,5000) // sets the interval to 5 seconds (5000ms)

			// when closing webview clears interval to stop extension and dispose
			panel.onDidDispose( () => {
				clearInterval(intr);
				},
				null,
				context.subscriptions
			);

		})
		
	);
	
	
}

// temporary web page render until custom panel is complete
// TODO: get rid of this static html page and only load the dynamic template render
function getWebViewSourceVisual(context) {
	const path = require('path')
	const filepath = context.asAbsolutePath(path.join('src','views','viewHTML.html'))
	let html_view = fs.readFileSync(filepath,'utf-8')
	return html_view
}

// TODO: create new module for this and explore object depth per Symbol for table
// INFO: This function creates an ejs template render and feeds it data from the vscode extension api 
async function getWebViewSourceEJS(context,new_doc_symbols) {
	const path = require('path')
	const filepath = context.asAbsolutePath(path.join('src','views','viewhtmlTemplate.ejs'))
	console.log(new_doc_symbols.length)
	let ejs_view = await ejs.renderFile(filepath, {"data":  new_doc_symbols}
	).then(data => {return data});
	
	return await ejs_view
}

// This method is called when your extension is deactivated
function deactivate() {
	console.log("deactivate")
	
}

module.exports = {
	activate,
	deactivate
}
