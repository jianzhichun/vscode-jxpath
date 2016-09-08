// import * as helper from '../help/helper'
// import {TextEditor, Range, DecorationOptions, window}  from 'vscode';
// import * as decorator from '../decorator/decorator'
// var dom = require('xmldom').DOMParser

// export let query_type = "XPATH";
// export let query = "";
// export function show_xml_afterxpath() {
//     var editor = window.activeTextEditor;
//     if (!editor) {
//         return; // No open text editor
//     }
//     var text = editor.document.getText();
//     window.showInputBox({
//         value: '',
//         prompt: "Enter the " + query_type + " query",
//         placeHolder: `${"" === query ? "For example://book" : query}`
//     }).then(_query => {
//         deal_query(editor, text, _query);
//         query = _query
//     })
// }

// function deal_query(editor: TextEditor, text: string, _query: string) {
//     var selection = new Range(editor.document.positionAt(0), editor.document.positionAt(text.length));
//     try {

//         var document = new dom().parseFromString(text);
//         var document_after_nodeType = helper.xpath_hightlight(document, _query, str => "$" + str + "$");
//         var document_after = helper.formatXml(document_after_nodeType[0].toString())
//         var nodeType = document_after_nodeType[1];

//         editor.edit((edit) => {
//             edit.replace(selection, document_after)
//         }).then(t => {

//             if (!t) return;
//             let _text = editor.document.getText();
//             let decorations: DecorationOptions[] = [];

//             switch (nodeType) {
//                 case 1:
//                     deal_tag(editor, _text, decorations, _query);
//                     break;
//                 case 2:
//                     deal_attr(editor, _text, decorations, _query);
//                     break;
//             }


//         })
//     }
//     catch (e) {
//         window.showErrorMessage("Couldnt parse JSON due to " + e.message)
//     }
// }
// function deal_tag(editor: TextEditor, _text: string, decorations: DecorationOptions[], _query: string) {
//     helper.xpath_getDecorations(editor, _text, /<\$(.*?)\$>([^<]|<[^$])*<\/\$\1\$>/g, 0, 0, _query, decorations, match => {
//         return match.replace(/<\$(.*?)\$>/g, "<$1>").replace(/<\/\$(.*?)\$>/g, "</$1>");
//     }).then(t => {
//         if (!t) return;
//         decorator.updateDecorations(editor, decorations)
//     })
// }
// function deal_attr(editor: TextEditor, _text: string, decorations: DecorationOptions[], _query: string) {
//     helper.xpath_getDecorations(editor, _text, /\$(.*?)\$\s*=?"/g, 0, 0, _query, decorations, match => {
//         return match.replace(/\$(.*?)\$/g, "$1");
//     }).then(t => {
//         if (!t) return;
//         decorator.updateDecorations(editor, decorations)
//     })
// }