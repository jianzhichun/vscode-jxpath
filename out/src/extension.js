'use strict';
var vscode_1 = require('vscode');
var jpController = require('./controler/jp-controller');
function activate(context) {
    var disposable = vscode_1.commands.registerCommand('extension.jxpath', function () {
        jpController.executeJsonpathExpression();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map