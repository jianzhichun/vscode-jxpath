'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {ExtensionContext,commands,window,StatusBarAlignment} from 'vscode';
import * as controler from './controler/controler'


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let aaa:string = "aaa";
export function activate(context: ExtensionContext) {
    
    var disposable = commands.registerCommand('extension.jxpath', () => {
        
<<<<<<< HEAD
        let expression = '$.store.book[*].author';

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
=======
        controler.show_xml_afterxpath();
>>>>>>> 20ab14f58104f9e5f79d84979e07c53037d2acce
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}