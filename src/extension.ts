'use strict';

import { ExtensionContext, commands, StatusBarItem, window, StatusBarAlignment, DecorationOptions } from 'vscode';
import * as jpController from './controler/jp-controller';
import { matchTextDecorationType } from './decorator/jp-decorator'

export let isJsonpathOpen = false;

export function activate(context: ExtensionContext) {

    let _statusBarItem: StatusBarItem;

    let openJsonpath = commands.registerCommand('extension.openjsonpath', () => {
        isJsonpathOpen = true;
        
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
            context.subscriptions.push(_statusBarItem);
        }
        this._statusBarItem.text = 'Jsonpath search opened!';
        this._statusBarItem.show();
    });

    let closeJsonpath = commands.registerCommand('extension.closejsonpath', () => {
        isJsonpathOpen = false;
        
        let activeEditor = window.activeTextEditor;
        if (!activeEditor) {
            return;
        }

        let decorations: DecorationOptions[] = [];
        activeEditor.setDecorations(matchTextDecorationType, decorations);
        this._statusBarItem.text = '';
        this._statusBarItem.show();
    });

    let executeJsonpath = commands.registerCommand('extension.jsonpath', () => {
        if(!isJsonpathOpen) {
            return;
        }

        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
            context.subscriptions.push(_statusBarItem);
        }
        this._statusBarItem.text = "Typing jsonpath expression...";
        this._statusBarItem.show();

        jpController.executeJsonpathExpression(context, this._statusBarItem);
    });

    context.subscriptions.push(executeJsonpath);
}

// this method is called when your extension is deactivated
export function deactivate() {

}