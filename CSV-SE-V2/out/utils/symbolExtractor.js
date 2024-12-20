"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSymbols = extractSymbols;
exports.get_symbols = get_symbols;
const vscode = __importStar(require("vscode"));
async function extractSymbols(document) {
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
async function get_symbols(uri) {
    try {
        const symbols = await vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', uri);
        if (symbols) {
            symbols.forEach(symbol => {
                console.log(`Symbol: ${symbol.name}, Kind: ${symbol.kind}, Location: ${symbol.location.uri.fsPath}`);
            });
        }
        else {
            vscode.window.showInformationMessage('No symbols found in the workspace.');
        }
        return symbols;
    }
    catch (error) {
        return error;
    }
}
//# sourceMappingURL=symbolExtractor.js.map