'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var helper = require('../src/help/helper');
var decorator = require('../src/decorator/decorator');
var dom = require('xmldom').DOMParser;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var disposable = vscode.commands.registerCommand('extension.jxpath', function () {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var text = editor.document.getText();
        var selection = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(text.length));
        // console.log(text)
        try {
            var document = new dom().parseFromString(text);
            // console.log(document);
            var document_after = helper.xpath_hightlight(document, "//title", function (tagName) { return "$" + tagName + "$"; }).toString();
            // console.log(document_after);
            var rs = helper.formatXml(document_after);
            // console.log(rs)
            editor.edit(function (edit) {
                edit.replace(selection, rs);
            }).then(function (t) {
                if (!t)
                    return;
                var tt = editor.document.getText();
                console.log(tt);
                var decorations = [];
                helper.xpath_getDecorations(editor, tt, /<(\$.*?\$)>.*?<\/\$.*?\$>/g, 0, 4, "//title", decorations, function (match) {
                    return match.replace("<$", "<").replace("$>", ">").replace("</$", "</").replace("$>", ">");
                }).then(function (t) {
                    if (!t)
                        return;
                    editor.edit(function (edit) {
                        var text = editor.document.getText();
                        var selection = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(text.length));
                        edit.replace(selection, helper.formatXml(text));
                    }).then(function (t) {
                        if (!t)
                            return;
                        decorator.updateDecorations(editor, decorations);
                    });
                });
            });
        }
        catch (e) {
            vscode.window.showErrorMessage("Couldnt parse JSON due to " + e.message);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map