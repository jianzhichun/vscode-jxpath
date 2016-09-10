'use strict';
var vscode_1 = require('vscode');
var jpController = require('./controler/jp-controller');
function activate(context) {
    var _this = this;
    var _statusBarItem;
    var executeJsonpath = vscode_1.commands.registerCommand('extension.jsonpath', function () {
        if (!_this._statusBarItem) {
            _this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
            context.subscriptions.push(_statusBarItem);
        }
        _this._statusBarItem.text = "";
        _this._statusBarItem.show();
        jpController.executeJsonpathExpression(context, _this._statusBarItem);
    });
    context.subscriptions.push(executeJsonpath);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map