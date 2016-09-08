import * as vscode from 'vscode';

let matchTextDecorationType = vscode.window.createTextEditorDecorationType({
    borderWidth: '1px',
    borderStyle: 'solid',
    overviewRulerColor: 'blue',
    overviewRulerLane: vscode.OverviewRulerLane.Right,
    light: {
        // this color will be used in light color themes
        borderColor: 'lightblue'
    },
    dark: {
        // this color will be used in dark color themes
        borderColor: 'lightblue'
    }
});
export function updateDecorations(activeEditor: vscode.TextEditor, decorations: vscode.DecorationOptions[]) {
    if (!activeEditor) {
        return;
    }
    activeEditor.setDecorations(matchTextDecorationType, decorations);
}