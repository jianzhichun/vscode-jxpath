'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode_1 = require('vscode');
var controler = require('./controler/controler');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
var aaa = "aaa";
function activate(context) {
    var disposable = vscode_1.commands.registerCommand('extension.jxpath', function () {
        controler.show_xml_afterxpath();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map