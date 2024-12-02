import * as vscode from 'vscode';

export class DocumentSymbolProviderCustom implements vscode.DocumentSymbolProvider {
    constructor() {
        let token = new vscode.CancellationTokenSource().token;
    }
    public provideDocumentSymbols(document: vscode.TextDocument | undefined, token: vscode.CancellationToken): vscode.ProviderResult<vscode.DocumentSymbol[]> {
        const symbols: vscode.DocumentSymbol[] = [];
        if (symbols) {
            symbols.forEach(symbol => {
                console.log(`Symbol: ${symbol.name}, Kind: ${symbol.kind}, Location: ${document?.uri.fsPath}`);
                if (symbol.children) {
                    symbol.children.forEach(child => {
                        console.log("child");
                        console.log(`Symbol: ${child.name}, Kind: ${child.kind}, Location: ${document?.uri.fsPath}`);
                        if (child.kind in symbolKindNames) {
                            console.log(child.kind, symbolKindNames[child.kind]);
                        }
                    });
                }
            });
        } else {
            vscode.window.showInformationMessage('No symbols found in the workspace.');
        }

        return symbols;
    }
}

const symbolKindNames: { [key: number]: string } = {
    0: "File",
    1: "Module",
    2: "Namespace",
    3: "Package",
    4: "Class",
    5: "Method",
    6: "Property",
    7: "Field",
    8: "Constructor",
    9: "Enum",
    10: "Interface",
    11: "Function",
    12: "Variable",
    13: "Constant",
    14: "String",
    15: "Number",
    16: "Boolean",
    17: "Array",
    18: "Object",
    19: "Key",
    20: "Null",
    21: "EnumMember",
    22: "Struct",
    23: "Event",
    24: "Operator",
    25: "TypeParameter"
};