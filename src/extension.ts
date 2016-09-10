'use strict';

import { ExtensionContext, commands, StatusBarItem, window, StatusBarAlignment } from 'vscode';
import * as jpController from './controler/jp-controller';


export function activate(context: ExtensionContext) {

    let _statusBarItem: StatusBarItem;

    let executeJsonpath = commands.registerCommand('extension.jsonpath', () => {
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
            context.subscriptions.push(_statusBarItem);
        }
        this._statusBarItem.text = "";
        this._statusBarItem.show();

        jpController.executeJsonpathExpression(context, this._statusBarItem);
    });

    context.subscriptions.push(executeJsonpath);
}

// this method is called when your extension is deactivated
export function deactivate() {

}