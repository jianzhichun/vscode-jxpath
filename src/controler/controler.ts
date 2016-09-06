import * as helper from '../help/helper'
import {TextEditor,Range,DecorationOptions,window}  from 'vscode';
import * as decorator from '../decorator/decorator'
var dom = require('xmldom').DOMParser

export function show_xml_afterxpath(editor: TextEditor,text:string,query:string){
    
    var selection = new Range(editor.document.positionAt(0), editor.document.positionAt(text.length));
    try {
        var document = new dom().parseFromString(text);
        var document_after = helper.formatXml(helper.xpath_hightlight(document, query, str => "$" + str + "$").toString());
        editor.edit((edit) => {
            edit.replace(selection, document_after)
        }).then(t => {
            
            if (!t) return;
            let _text = editor.document.getText();
            let element_decorations: DecorationOptions[] = [];
            let attribute_decorations: DecorationOptions[] = [];
            helper.xpath_getDecorations(editor, _text, /<\$(.*?)\$>[\s\S]*<\/\$\1\$>?/g, 0, 0, query, element_decorations, match => {
                return match.replace(/<\$(.*)\$>/g, "<$1>").replace(/<\/\$(.*)\$>/g, "</$1>");
            }).then(t => {
                if (!t) return;
                decorator.updateDecorations(editor, element_decorations)
            })
            helper.xpath_getDecorations(editor, _text, /\$(.*?)\$[\s\S]*?"/g, 0, 0, query, attribute_decorations, match => {
                return match.replace(/\$(.*?)\$/g, "$1");
            }).then(t => {
                if (!t) return;
                decorator.updateDecorations(editor, attribute_decorations)
            })
        })
    }
    catch (e) {
        window.showErrorMessage("Couldnt parse JSON due to " + e.message)
    }
}