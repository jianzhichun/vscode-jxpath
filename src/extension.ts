'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as helper from '../src/help/helper'
import * as decorator from '../src/decorator/decorator'
var dom = require('xmldom').DOMParser
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    var disposable = vscode.commands.registerCommand('extension.jxpath', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var text = editor.document.getText();
        var selection = new vscode.Range(editor.document.positionAt(0),editor.document.positionAt(text.length));
        
        // console.log(text)
        try {
            var document = new dom().parseFromString(text);
            // console.log(document);
            var document_after = helper.xpath_hightlight(document, "//title", tagName => "$" + tagName + "$").toString();
            // console.log(document_after);
            var rs = helper.formatXml(document_after);
            // console.log(rs)
            editor.edit((edit) => {
                edit.replace(selection, rs)
            }).then(t => {
                if (!t) return;
                let tt = editor.document.getText();
                console.log(tt);
                let decorations: vscode.DecorationOptions[] = [];
                helper.xpath_getDecorations(editor, tt, /<(\$.*?\$)>.*?<\/\$.*?\$>/g, 0, 4, "//title", decorations, match => {
                    return match.replace("<$", "<").replace("$>", ">").replace("</$", "</").replace("$>", ">");
                }).then(t => {
                    if (!t) return;
                    editor.edit((edit) => {
                        var text = editor.document.getText();
                        var selection = new vscode.Range(editor.document.positionAt(0),editor.document.positionAt(text.length));
                        edit.replace(selection, helper.formatXml(text));
                    }).then(t => {
                        if (!t) return;
                        decorator.updateDecorations(editor, decorations)
                    })
                })
            })
        }
        catch (e) {
            vscode.window.showErrorMessage("Couldnt parse JSON due to " + e.message)
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}