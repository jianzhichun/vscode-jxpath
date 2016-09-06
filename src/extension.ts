'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {ExtensionContext,commands,window,StatusBarAlignment} from 'vscode';
import * as controler from './controler/controler'


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let aaa:string = "aaa";
export function activate(context: ExtensionContext) {
    var statusbar = window.createStatusBarItem(StatusBarAlignment.Left)
    
    statusbar.text = `${ aaa }` || "";
    statusbar.show() 
    var disposable = commands.registerCommand('extension.jxpath', () => {
        var editor = window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var text = editor.document.getText();
        controler.show_xml_afterxpath(editor,text,statusbar.text);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}