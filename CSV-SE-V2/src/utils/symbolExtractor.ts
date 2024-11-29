import * as vscode from 'vscode';

export async function extractSymbols(document: vscode.TextDocument) {
    try {
        
        let fileName = document.fileName;
        if (!fileName) {
            vscode.window.showErrorMessage("No active editor or file name found");
            throw new Error("No active editor or file name found");
        }
        let new_doc = vscode.Uri.parse(fileName);
        let DSP = await vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", new_doc).then((data) => { return data; });
        console.log(DSP);
        let new_doc_symbols = DSP; // converts array to object
        console.log(await new_doc_symbols);
        
        return new_doc_symbols;
    }
     catch (error) {
        vscode.window.showErrorMessage("erorr here");
        return null;
    }
}
export async function get_symbols(uri: vscode.Uri) {
    try {
        const symbols = await vscode.commands.executeCommand<vscode.SymbolInformation[]>('vscode.executeDocumentSymbolProvider', uri);
        if (symbols) {
            symbols.forEach(symbol => {
                console.log(`Symbol: ${symbol.name}, Kind: ${symbol.kind}, Location: ${symbol.location.uri.fsPath}`);
            });
        } else {
            vscode.window.showInformationMessage('No symbols found in the workspace.');
        }
        return symbols;
    } catch (error) {
        return error;
    }

}