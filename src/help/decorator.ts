import * as vscode from 'vscode';
import { JsonPathHelper, Bracket } from './jsonpath-helper';

export class Decorator {

    timeout: any = null;

    private matchTextDecorationType = vscode.window.createTextEditorDecorationType({
        borderWidth: '1px',
        borderStyle: 'dashed',
        overviewRulerColor: 'blue',
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
            // backgroundColor: 'red'
            borderColor: 'red'
        },
        dark: {
            borderColor: 'yellow'
            // backgroundColor: 'yellow'
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


/**
 * {
    "store": {
        "book": [
            {
                "category": "reference",
                "author": "Nigel Rees",
                "title": "Sayings of the Century",
                "price": 8.95
            },
            {
                "category": {
                    "category": "fiction",
                    "author": "Herman Melville",
                    "title": "Moby Dick",
                    "isbn": "0-553-21311-3",
                    "price": 8.99
                },
                "author": "Evelyn Waugh",
                "title": "Sword of Honour",
                "price": 12.99
            },
            {
                "category": "fiction",
                "author": "Herman Melville",
                "title": "Moby Dick",
                "isbn": "0-553-21311-3",
                "price": 8.99
            },
            {
                "category": "fiction",
                "author": "J. R. R. Tolkien",
                "title": "The Lord of the Rings",
                "isbn": "0-395-19395-8",
                "price": 22.99
            }
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
}
 */
        // TEST CASES
        // $.store.book[*].author ok
        // $..author ok
        // $.store.* ok
        // $.store..price ok
        // $..book[2] ok
        // $..book[(@.length-1)] ok
        // $..book[-1:] ok
        // $..book[0,1] ok
        // $..book[:2] ok
        // $..* ok
        // $..book[?(@.price<10)] ok
        // $..book[?(@.isbn)] ok
        // $..book[?(@.price==8.95)] ok
        // $..book[?(@.price<30 && @.category=="fiction")] ok

// $.store.book[*].price[0] ok
// $.store.book[*].price[1] ok
// $.store.book[*].price[2] ok
// $.store.book[*].price[3] ok
// $.store.book[*].price ok
// $.store.book[*].category ok
// 


        let positions = jsonPathHelper.getMatchPositions(text, '$.store.book[*].price');

        for (let i = 0; i < positions.length; i++) {
            let startPos = activeEditor.document.positionAt(positions[i].startPos);
            let endPos = activeEditor.document.positionAt(positions[i].endPos);
            let decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: expression };
            decorations.push(decoration);
        }

        activeEditor.setDecorations(this.matchTextDecorationType, decorations);
    }
}