'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode_1 = require('vscode');
var controler = require('./controler/controler');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
var aaa = "aaa";
function activate(context) {
<<<<<<< HEAD
    console.log('"vscode-jxpath" is activated!');
    var decorator = new decorator_1.Decorator();
    var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        var expression = '$.store.book[*].author';
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
=======
    var disposable = vscode_1.commands.registerCommand('extension.jxpath', function () {
        controler.show_xml_afterxpath();
>>>>>>> 20ab14f58104f9e5f79d84979e07c53037d2acce
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map