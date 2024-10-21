// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "CSV-SE" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('CSV-SE.showSourceVisualizer', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
	// 	vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Activated.');
	// 	console.log(vscode.window.activeTextEditor.document.fileName)

	// 	let active_document = vscode.window.activeTextEditor
	// 	let new_doc = vscode.Uri.parse(active_document.document.fileName)

		
	// 	console.log(active_document.document.getText())
		

	// });

	context.subscriptions.push(
		vscode.commands.registerCommand('CSV-SE.showSourceVisualizer', function () {
			vscode.window.showInformationMessage('Chrubeanie_Source_Visualizer Activated.');
			// The code you place here will be executed every time your command is executed
			const panel = vscode.window.createWebviewPanel(
				'SCActive',
				'Source Control Visualizer',
				vscode.ViewColumn.One,
				{
					localResourceRoots: [vscode.Uri.joinPath(context.extensionUri,"CSV-SE/viewHTML.html")]
				}
			)
			panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri,'CSV-SE/viewHTML.html'))
			let custom_view = async () => { 
				let load_page =  await fetch("/CSV-SE/viewHTML.html").then((response) => {return response})
				let sel_in = load_page
				console.log(sel_in)
			
			}
			custom_view()
			// Display a message box to the user
			// panel.webview.html = getWebViewSourceVisual(vscode.window.activeTextEditor.document.fileName)
			
			let active_document = vscode.window.activeTextEditor
			vscode.window.showTextDocument(active_document.document)
			let new_doc = vscode.Uri.parse(active_document.document.fileName)
			// panel.webview.postMessage(async () => { await new_doc_symbols[0]})
			const updateWebView = async () => {
				let DSP = await vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", new_doc).then((data) => { return data })
				let new_doc_symbols = Object.assign({},DSP)
				console.log(await new_doc_symbols[0])
				for (const key in new_doc_symbols) {
					if (Object.prototype.hasOwnProperty.call(new_doc_symbols, key)) {
						const element = new_doc_symbols[key];
						console.log(element)
					}
				}
				panel.webview.html = getWebViewSourceVisual(new_doc_symbols[0].name)
				console.log(`${new_doc_symbols[4]} updated`)
			}
			updateWebView()

			
			const intr = setInterval(updateWebView,5000)

			// when closing webview
			panel.onDidDispose( () => {
				clearInterval(intr);
			},
			null,
			context.subscriptions
			);
			
		})
		// "CSV-SE/viewHTML.html"
	);
	// context.subscriptions.push()
}

async function get_html() {
	let html_render = await fs.readFile("/CSV-SE/viewHTML.html",(error,data) => {
		console.log(error,data)
		
	})
	return html_render
}

function getWebViewSourceVisual(activeEditor) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Source</title>
</head>
<body>
	<h1>Source Visualizer</h1>
	<br>
	docu
	
</body>
</html>`
}

// This method is called when your extension is deactivated
function deactivate() {
	console.log("deactivate")
	
}

module.exports = {
	activate,
	deactivate
}
