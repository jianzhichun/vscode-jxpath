import * as vscode from 'vscode';
import { JsonPathHelper, Position } from '../helper/jsonpath-helper';

export class Decorator {
    timeout: any = null;

    private matchTextDecorationType = vscode.window.createTextEditorDecorationType({
        borderWidth: '1px',
        borderStyle: 'dashed',
        overviewRulerColor: 'blue',
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
            borderColor: 'red'
        },
        dark: {
            borderColor: 'yellow'
        }
    });

    private cancelHighlightDecorationType = vscode.window.createTextEditorDecorationType({
        borderWidth: '1px',
    });

    public triggerUpdateDecorations(activeEditor: vscode.TextEditor, expression: string) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.updateDecorations(activeEditor, expression), 500);
    }

    public cancelHighlight(activeEditor: vscode.TextEditor) {
        if (!activeEditor) {
            return;
        }
        let text = activeEditor.document.getText();
        activeEditor.edit(function (editBuilder: vscode.TextEditorEdit) {
            let startPos = activeEditor.document.positionAt(0);
            let endPos = activeEditor.document.positionAt(text.length - 1);
            editBuilder.replace(new vscode.Range(startPos, endPos), text);
        })
        // let textLen = activeEditor.document.getText().length;
        // let startPos = activeEditor.document.positionAt(0);
        // let endPos = activeEditor.document.positionAt(textLen - 1);
        // let decoration: vscode.DecorationOptions[] = [{ range: new vscode.Range(startPos, endPos), hoverMessage: '' }];
        // activeEditor.setDecorations(this.cancelHighlightDecorationType, decoration);
    }

    private updateDecorations(activeEditor: vscode.TextEditor, expression: string) {
        if (!activeEditor) {
            return;
        }
        if(!expression) {
            return;
        }

        let text = activeEditor.document.getText();
        let jsonPathHelper = new JsonPathHelper();
        let decorations: vscode.DecorationOptions[] = [];
        let positions = jsonPathHelper.getMatchPositions(text, expression);

        for (let i = 0; i < positions.length; i++) {
            let startPos = activeEditor.document.positionAt(positions[i].startPos);
            let endPos = activeEditor.document.positionAt(positions[i].endPos);
            let decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: expression };
            decorations.push(decoration);
        }

        activeEditor.setDecorations(this.matchTextDecorationType, decorations);
    }
}