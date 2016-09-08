var jp = require('jsonpath');
var xp = require('xpath');
import {DecorationOptions, TextEditor, Range} from 'vscode';
/**
 * use jsonpath to search node and decorate the node by prefix and surfix
 * 
 * args:
 *      obj: jsonObject
 *      query: string
 *      prefix: string
 *      surfix: string
 * return:
 *      jsonObject
 * e.g.
 *      var data = {
 *          "store": {
 *              "book": [{
 *                  "category": "reference",
 *                  "author": "Nigel Rees",
 *              }]
 *          }
 *      }
 *      console.log(JSON.stringify(hightlight(data, "$..author", "kk~~", "~~cc")))
 *      //{"store":{"book":[{"category":"reference","author":"kk~~Nigel Rees~~cc"}]}}
 * 
 */
export function jsonpath_hightlight(obj: any, query: string, prefix: string, surfix: string) {
    // prefix = prefix.replace("\"","\\");
    // surfix = prefix.replace("\"","\\");
    jp.nodes(obj, query).forEach(function (node) {
        var index = "data"
        node.path.forEach(function (p) {
            if (p == "$") return
            index += "[\"" + p + "\"]"
        })
        eval(index + "=prefix+node.value+surfix")
    });
    return obj;
}
/**
 * use xpath to search node and decorate the node by prefix and surfix
 * 
 * args:
 *      obj: xmldom
 *      query: string
 *      op:Function(arg:tagName)
 * return:
 *      xmldom
 * e.g.
 *      var dom = require('xmldom').DOMParser
 *      var xmlSerializer = require('xmldom').XMLSerializer
 *      var xml = "<book><title>Harry Potter</title></book>"
 *      var document = new dom().parseFromString(xml)
 *      console.log(new xmlSerializer().serializeToString(helper.xpath_hightlight(document, "//title", function(tagname){return "$$$"})))
 *      //<book><$$$>Harry Potter</$$$></book>
 * 
 */
export function xpath_hightlight(obj: any, query: string, op: Function) {
    var iterator = xp.evaluate(query, obj, null, xp.XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)
    var thisNode;
    var nodeType="";
    try {
        thisNode = iterator.iterateNext();
        nodeType = thisNode.nodeType;
        while (thisNode) {
            if(thisNode.nodeType === 1){
                thisNode.tagName = op(thisNode.tagName);
            }
            if(thisNode.nodeType === 2){
                thisNode.name = op(thisNode.name);
            }
            thisNode = iterator.iterateNext();
        }
    } catch (e) {
    }
    return [obj,nodeType];
}
/**
 * get the decoration via regex
 * 
 * args:
 *      ...
 * 
 * return:
 *      promise
 */
export function xpath_getDecorations(editor: TextEditor, xml: string, regex: RegExp, startminus: number, endminus: number, hoverMsg: string, decorations: DecorationOptions[], fn: Function) {
    
    return editor.edit((edit) => {
        var match;
        
        while (match = regex.exec(xml)) {
            
            var startPos_true = editor.document.positionAt(match.index);
            var endPos_true = editor.document.positionAt(match.index + match[0].length);
            var range_true = new Range(startPos_true, endPos_true);

            var startPos = editor.document.positionAt(match.index - startminus);
            var endPos = editor.document.positionAt(match.index + match[0].length - endminus);
            var range = new Range(startPos, endPos);
            var rmatch = fn(match[0]);
            console.log(rmatch);
            
            var decoration = { range: range, hoverMessage: hoverMsg };

            decorations.push(decoration);
            edit.replace(range_true, rmatch)
            xml = editor.document.getText()
            // console.log(xml);
        }
    })
}
/**
 * format xml to pretty code
 * 
 * args:
 *      xml: string
 * 
 * return
 *      pretty-xml：string
 */
export function formatXml(xml) {
    xml = xml.replace(/\n/g,"").replace(/>\s+</g,"><");
    console.log("formatxml :      "+xml);
    
    var reg = /(>)(<)(\/*)/g;
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
    var pad = 0;
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    var lastType = 'other';
    // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
    var transitions = {
        'single->single': 0,
        'single->closing': -1,
        'single->opening': 0,
        'single->other': 0,
        'closing->single': 0,
        'closing->closing': -1,
        'closing->opening': 0,
        'closing->other': 0,
        'opening->single': 1,
        'opening->closing': 0,
        'opening->opening': 1,
        'opening->other': 1,
        'other->single': 0,
        'other->closing': -1,
        'other->opening': 0,
        'other->other': 0
    };

    for (var i = 0; i < lines.length; i++) {
        var ln = lines[i];
        var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
        var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
        var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
        var fromTo = lastType + '->' + type;
        lastType = type;
        var padding = '';

        indent += transitions[fromTo];
        for (var j = 0; j < indent; j++) {
            padding += '    ';
        }
        if (fromTo === "opening->closing")
            formatted = formatted.slice(0, -1) + ln + '\n';
        else formatted += padding + ln + '\n';

    }

    return formatted;
};