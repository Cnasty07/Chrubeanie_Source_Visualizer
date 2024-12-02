import * as vscode from 'vscode';
import {context} from '../extension';
const ext = context.extension;

export class UpdateEvents implements vscode.Disposable {
    private disposables: vscode.Disposable[] = [];

    constructor() {
        // Register event listeners
        this.disposables.push(
            vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this),
            vscode.workspace.onDidSaveTextDocument(this.onDidSaveTextDocument, this),
            vscode.window.onDidChangeActiveTextEditor(this.onDidChangeActiveTextEditor, this)
        );
    }

    // Event handler for text document changes
    private onDidChangeTextDocument(event: vscode.TextDocumentChangeEvent) {
        console.log(`Document changed: ${event.document.uri}`);
        
    }

    // Event handler for text document saves
    private onDidSaveTextDocument(document: vscode.TextDocument) {
        console.log(`Document saved: ${document.uri}`);
    }

    // Event handler for active text editor changes
    private onDidChangeActiveTextEditor(editor: vscode.TextEditor | undefined) {
        if (editor) {
            console.log(`Active editor changed: ${editor.document.uri}`);
        }
    }

    // Dispose method to clean up event listeners
    public dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
    }
}

// Usage example
const updateEvents = new UpdateEvents();

// To dispose of the event listeners when no longer needed
// updateEvents.dispose();