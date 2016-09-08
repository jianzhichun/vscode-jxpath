//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
"use strict";
<<<<<<< HEAD
=======
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
var vscode = require('vscode');
>>>>>>> 20ab14f58104f9e5f79d84979e07c53037d2acce
// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {
    // Defines a Mocha unit test
    // test("Something 1", () => {
    //     assert.equal(-1, [1, 2, 3].indexOf(5));
    //     assert.equal(-1, [1, 2, 3].indexOf(0));
    // });
<<<<<<< HEAD
    var data = "{\n  \"store\": {\n    \"book\": [ \n      {\n        \"category\": \"reference\",\n        \"author\": \"Nigel Rees\",\n        \"title\": \"Sayings of the Century\",\n        \"price\": 8.95\n      }, {\n        \"category\": \"fiction\",\n        \"author\": \"Evelyn Waugh\",\n        \"title\": \"Sword of Honour\",\n        \"price\": 12.99\n      }, {\n        \"category\": \"fiction\",\n        \"author\": \"Herman Melville\",\n        \"title\": \"Moby Dick\",\n        \"isbn\": \"0-553-21311-3\",\n        \"price\": 8.99\n      }, {\n         \"category\": \"fiction\",\n        \"author\": \"J. R. R. Tolkien\",\n        \"title\": \"The Lord of the Rings\",\n        \"isbn\": \"0-395-19395-8\",\n        \"price\": 22.99\n      }\n    ],\n    \"bicycle\": {\n      \"color\": \"red\",\n      \"price\": 19.95\n    }\n  }\n}";
    var dataJson = JSON.parse(data);
    var dataStr = JSON.stringify(dataJson, null, 4);
    for (var i = 0; i < dataStr.length; i++) {
        if (dataStr[i] === '\n') {
            dataStr = dataStr.replace('\n', '\\n');
        }
    }
    console.log(dataStr);
=======
    // var dom = require('xmldom').DOMParser
    // var xmlSerializer = require('xmldom').XMLSerializer
    // var xml = "<book><title><aa>Harry Potter</aa></title><title><aa>Harry Potter</aa></title></book>"
    // var document = new dom().parseFromString(xml)
    // xml = new xmlSerializer().serializeToString(helper.xpath_hightlight(document, "//title", function (tagName) { return "$$$" }))
    // console.log(helper.formatXml(xml))
    var text = vscode.window.activeTextEditor.document.getText();
>>>>>>> 20ab14f58104f9e5f79d84979e07c53037d2acce
});
//# sourceMappingURL=extension.test.js.map