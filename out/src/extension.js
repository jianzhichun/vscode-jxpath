'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var decorator_1 = require('./help/decorator');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('"vscode-jxpath" is activated!');
    var decorator = new decorator_1.Decorator();
    var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        var expression = '$..book[?(@.price==8.95)]';
        var activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            decorator.triggerUpdateDecorations(activeEditor, expression);
        }
        vscode.window.onDidChangeActiveTextEditor(function (editor) {
            activeEditor = editor;
            if (editor) {
                decorator.triggerUpdateDecorations(activeEditor, expression);
            }
        }, null, context.subscriptions);
        vscode.workspace.onDidChangeTextDocument(function (event) {
            if (activeEditor && event.document === activeEditor.document) {
                decorator.triggerUpdateDecorations(activeEditor, expression);
            }
        }, null, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map