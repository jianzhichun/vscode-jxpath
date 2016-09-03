import * as vscode from 'vscode';
import { JsonPathHelper, Position } from './jsonpath-helper';

export class Decorator {

    timeout: any = null;

    private matchTextDecorationType = vscode.window.createTextEditorDecorationType({
        borderWidth: '1px',
        borderStyle: 'solid',
        overviewRulerColor: 'blue',
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
            borderColor: 'red'
        },
        dark: {
            borderColor: 'yellow'
        }
    });

    public triggerUpdateDecorations(activeEditor: vscode.TextEditor, expression: string) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.updateDecorations(activeEditor, expression), 500);
    }

    private updateDecorations(activeEditor: vscode.TextEditor, expression: string) {
        if (!activeEditor) {
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