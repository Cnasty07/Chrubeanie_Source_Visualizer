import * as vscode from 'vscode';
import {context} from '../extension';
const ext = context.extension;

export function test_event(event: vscode.TextEditorSelectionChangeEvent) {
    vscode.window.showInformationMessage('Event Triggered');
    console.log(event);
}