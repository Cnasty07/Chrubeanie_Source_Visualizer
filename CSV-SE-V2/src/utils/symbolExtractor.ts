import * as vscode from 'vscode';

export async function extractSymbols(document: vscode.TextDocument) {
    let fileName = document.fileName;
    if (!fileName) {
        vscode.window.showErrorMessage("No active editor or file name found");
        throw new Error("No active editor or file name found");
    }
    let new_doc = vscode.Uri.parse(fileName);
    let DSP = await vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", new_doc).then((data) => { return data });
    let new_doc_symbols = DSP; // converts array to object
    console.log(await new_doc_symbols);
    
    return new_doc_symbols;
}

