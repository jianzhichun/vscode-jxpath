import * as vscode from 'vscode';
import { JsonPathHelper, Position } from '../helper/jsonpath-helper';
import { isJsonpathOpen } from '../extension';

export let matchTextDecorationType = vscode.window.createTextEditorDecorationType({
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

export class Decorator {
    // timeout: any = null;

    // public triggerUpdateDecorations(activeEditor: vscode.TextEditor, expression: string) {
    //     if(!expression) {
    //         return;
    //     }

    //     if (this.timeout) {
    //         clearTimeout(this.timeout);
    //     }
    //     this.timeout = setTimeout(this.updateDecorations(activeEditor, expression), 500);
    // }
    private _statusBarItem: vscode.StatusBarItem;

    constructor(_statusBarItem: vscode.StatusBarItem) {
        this._statusBarItem = _statusBarItem;
    }

    private showNoResultInfoInStatusBarItem(message: string) {
        let statusBarItem = this._statusBarItem;
        statusBarItem.text = message;
        statusBarItem.show();
    }

    public updateDecorations(activeEditor: vscode.TextEditor, expression: string) {
        if(!isJsonpathOpen) {
            return;
        }

        if (!expression) {
            this.showNoResultInfoInStatusBarItem(`No result found for expression: ${expression}`);
            return;
        }

        if (!activeEditor) {
            return;
        }

        let text = activeEditor.document.getText();
        let textJson; 
        try {
            textJson = JSON.parse(text);
        } catch (error) {
            this.showNoResultInfoInStatusBarItem(`Invalid json file.`);
            return;
        }

        let jsonPathHelper = new JsonPathHelper();
        let decorations: vscode.DecorationOptions[] = [];

        let positions;

        try {
            positions = jsonPathHelper.getMatchPositions(text, textJson, expression);
        } catch (error) {
             this.showNoResultInfoInStatusBarItem(`Invalid expression: ${expression}`);
             return;
        }

        if (!positions || positions.length === 0) {
            this.showNoResultInfoInStatusBarItem(`No result found for expression: ${expression}`);
            return;
        }

        if (!positions || positions.length == 0) {
            return;
        }

        for (let i = 0; i < positions.length; i++) {
            let startPos = activeEditor.document.positionAt(positions[i].startPos);
            let endPos = activeEditor.document.positionAt(positions[i].endPos);
            let decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: expression };
            decorations.push(decoration);
        }

        activeEditor.setDecorations(matchTextDecorationType, decorations);

        this.showNoResultInfoInStatusBarItem(`Found result of expression: ${expression}`);
    }
}