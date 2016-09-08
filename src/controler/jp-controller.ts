import { TextEditor, Range, DecorationOptions, window }  from 'vscode';
import { Decorator } from '../decorator/jp-decorator'

let QUERY_TYPE = 'JsonPath';
let expression = '';

export function executeJsonpathExpression() {
    let activeEditor = window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    window.showInputBox({
        value: '',
        prompt: "Enter the " + QUERY_TYPE + " expression",
        placeHolder: `${"" === expression ? "Example: $.store.book[*].author" : expression}`
    }).then(_expression => {
        let decorator = new Decorator();
        decorator.triggerUpdateDecorations(activeEditor, _expression);
        expression = _expression;
    })
}