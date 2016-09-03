'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { JsonPathHelper } from './help/jsonpath-helper';
import { Decorator } from './help/decorator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('"vscode-jxpath" is activated!');

    let decorator = new Decorator();

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        
        let expression = '$..book[?(@.price==8.95)]';

        let activeEditor = vscode.window.activeTextEditor;
        if(activeEditor) {
            decorator.triggerUpdateDecorations(activeEditor, expression);
        }

        vscode.window.onDidChangeActiveTextEditor(editor => {
            activeEditor = editor;
            if(editor) {
                decorator.triggerUpdateDecorations(activeEditor, expression);
            }
        }, null, context.subscriptions);

        vscode.workspace.onDidChangeTextDocument(event => {
            if(activeEditor && event.document === activeEditor.document) {
                decorator.triggerUpdateDecorations(activeEditor, expression);
            }
        }, null, context.subscriptions);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}