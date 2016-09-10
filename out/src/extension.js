'use strict';
var vscode_1 = require('vscode');
var jpController = require('./controler/jp-controller');
var jp_decorator_1 = require('./decorator/jp-decorator');
exports.isJsonpathOpen = false;
function activate(context) {
    var _this = this;
    var _statusBarItem;
    var openJsonpath = vscode_1.commands.registerCommand('extension.openjsonpath', function () {
        exports.isJsonpathOpen = true;
        if (!_this._statusBarItem) {
            _this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
            context.subscriptions.push(_statusBarItem);
        }
        _this._statusBarItem.text = 'Jsonpath search opened!';
        _this._statusBarItem.show();
    });
    var closeJsonpath = vscode_1.commands.registerCommand('extension.closejsonpath', function () {
        exports.isJsonpathOpen = false;
        var activeEditor = vscode_1.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        var decorations = [];
        activeEditor.setDecorations(jp_decorator_1.matchTextDecorationType, decorations);
        _this._statusBarItem.text = '';
        _this._statusBarItem.show();
    });
    var executeJsonpath = vscode_1.commands.registerCommand('extension.jsonpath', function () {
        if (!exports.isJsonpathOpen) {
            return;
        }
        if (!_this._statusBarItem) {
            _this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
            context.subscriptions.push(_statusBarItem);
        }
        _this._statusBarItem.text = "Typing jsonpath expression...";
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