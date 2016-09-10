'use strict';

import { ExtensionContext, commands } from 'vscode';
import * as jpController from './controler/jp-controller';

export function activate(context: ExtensionContext) {
    
    let disposable = commands.registerCommand('extension.jxpath', () => {
        jpController.executeJsonpathExpression();
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}