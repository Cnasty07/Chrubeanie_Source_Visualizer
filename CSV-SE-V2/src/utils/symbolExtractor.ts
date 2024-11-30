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
        vscode.window.showErrorMessage("error here");
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

export class DocumentSymbolProviderCustom implements vscode.DocumentSymbolProvider {
    constructor() { 
        let token = new vscode.CancellationTokenSource().token;
    }
    public provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.DocumentSymbol[]> {
        const symbols: vscode.DocumentSymbol[] = [];
        if (symbols) {
            symbols.forEach(symbol => {
                console.log(`Symbol: ${symbol.name}, Kind: ${symbol.kind}, Location: ${document.uri.fsPath}`);
                if (symbol.children) {
                    symbol.children.forEach(child => {
                        console.log("child");
                        console.log(`Symbol: ${child.name}, Kind: ${child.kind}, Location: ${document.uri.fsPath}`);
                    });
                }
            });
        } else {
            vscode.window.showInformationMessage('No symbols found in the workspace.');
        }

        return symbols;
    }
}

export class WorkspaceSymbolProvider implements vscode.WorkspaceSymbolProvider {
    constructor() { }
    public provideWorkspaceSymbols(query: string, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[]> {
        function symbols() {
            return vscode.commands.executeCommand<vscode.SymbolInformation[]>('vscode.executeWorkspaceSymbolProvider', query);
        }
        return symbols();
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

/* 
Enumeration Members
File: 0

Module: 1

Namespace: 2

Package: 3

Class: 4

Method: 5

Property: 6

Field: 7

Constructor: 8

Enum: 9

Interface: 10

Function: 11

Variable: 12

Constant: 13

String: 14

Number: 15

Boolean: 16

Array: 17

Object: 18

Key: 19

Null: 20

EnumMember: 21

Struct: 22

Event: 23

Operator: 24

TypeParameter: 25

*/