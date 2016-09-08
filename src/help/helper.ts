var jp = require('jsonpath');
var xp = require('xpath');
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
        var index = "obj"
        // node.path.forEach(function (p) {
        //     if (p == "$") return
        //     index += "[\"" + p + "\"]"
        // })
        let i=1
        for(;i<node.path.length-1;i++){
            index += "[\"" + node.path[i] + "\"]"
        }
        console.log(index)
        console.log(node.path[i])
        // delete obj["store"].book
        console.log("delete "+index+"."+node.path[i])
        eval("delete "+index+"."+node.path[i])
        eval(index+"[\""+prefix+"\"]"+"=node.value")
    });
    return obj;
}
/**
 * use xpath to search node and decorate the node by prefix and surfix
 * 
 * args:
 *      obj: xmldom
 *      query: string
 *      prefix: string
 *      surfix: string
 * return:
 *      xmldom
 * e.g.
 *      var dom = require('xmldom').DOMParser
 *      var xml = "<book><title>Harry Potter</title></book>"
 *      var document = new dom().parseFromString(xml)
 *      console.log(hightlight(document, "//title", "aa~~", "~~bb"))
 *      //<book><aa~~title~~bb>Harry Potter</aa~~title~~bb></book>
 * 
 */
export function xpath_hightlight(obj:any, query:string, prefix:string, surfix:string) {
    var iterator = xp.evaluate(query, obj, null, xp.XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)
    try {
        var thisNode = iterator.iterateNext();

        while (thisNode) {
            thisNode.tagName = prefix + thisNode.tagName + surfix;
            thisNode = iterator.iterateNext();
        }
    } catch (e) {
    }
    return obj;
}