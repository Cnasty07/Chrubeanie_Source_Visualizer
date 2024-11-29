import * as vscode from 'vscode';

const ext = vscode.extensions.getExtension('CSV-SE-V2');

export function test_event(event: vscode.TextEditorSelectionChangeEvent) {
    vscode.window.showInformationMessage('Event Triggered');
    console.log(event);
}