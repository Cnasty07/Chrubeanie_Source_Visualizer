const vscode = require('vscode');
async function activeDocSymbols() {
    let new_doc = vscode.Uri.parse(vscode.window.activeTextEditor.document.fileName)
    let DSP = await vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", new_doc).then((data) => { return data })
    let new_doc_symbols = Object.assign({}, DSP) // converts array to object
    console.log(await new_doc_symbols[0])
    for (const key in new_doc_symbols) {
        if (Object.prototype.hasOwnProperty.call(new_doc_symbols, key)) {
            const element = new_doc_symbols[key];
            console.log(element)
        }
    }
    return new_doc_symbols
}


module.exports = {
    activeDocSymbols
}