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
        
        controler.show_xml_afterxpath();
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}