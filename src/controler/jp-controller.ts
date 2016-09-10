import { TextEditor, Range, DecorationOptions, window, workspace, ExtensionContext, StatusBarItem }  from 'vscode';
import { Decorator, matchTextDecorationType } from '../decorator/jp-decorator'

let QUERY_TYPE = 'jsonpath';
let expression = '';

export function executeJsonpathExpression(context: ExtensionContext, _statusBarItem: StatusBarItem) {

    let activeEditor = window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    let decorations: DecorationOptions[] = [];
    activeEditor.setDecorations(matchTextDecorationType, decorations);
    
    let decorator = new Decorator(_statusBarItem);

    window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            decorator.updateDecorations(activeEditor, expression);
        }
    }, null, context.subscriptions);

    workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            decorator.updateDecorations(activeEditor, expression);
        }
    }, null, context.subscriptions);

    window.showInputBox({
        value: '',
        prompt: "Enter the " + QUERY_TYPE + " expression",
        placeHolder: `${"" === expression ? "Example: $.store.book[*].author" : expression}`
    }).then(_expression => {
        if(!_expression) {
            _expression = expression;
        }
        decorator.updateDecorations(activeEditor, _expression);
        expression = _expression;
    })
}