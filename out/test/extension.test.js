//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
"use strict";
// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {
    // Defines a Mocha unit test
    // test("Something 1", () => {
    //     assert.equal(-1, [1, 2, 3].indexOf(5));
    //     assert.equal(-1, [1, 2, 3].indexOf(0));
    // });
    var data = "{\n  \"store\": {\n    \"book\": [ \n      {\n        \"category\": \"reference\",\n        \"author\": \"Nigel Rees\",\n        \"title\": \"Sayings of the Century\",\n        \"price\": 8.95\n      }, {\n        \"category\": \"fiction\",\n        \"author\": \"Evelyn Waugh\",\n        \"title\": \"Sword of Honour\",\n        \"price\": 12.99\n      }, {\n        \"category\": \"fiction\",\n        \"author\": \"Herman Melville\",\n        \"title\": \"Moby Dick\",\n        \"isbn\": \"0-553-21311-3\",\n        \"price\": 8.99\n      }, {\n         \"category\": \"fiction\",\n        \"author\": \"J. R. R. Tolkien\",\n        \"title\": \"The Lord of the Rings\",\n        \"isbn\": \"0-395-19395-8\",\n        \"price\": 22.99\n      }\n    ],\n    \"bicycle\": {\n      \"color\": \"red\",\n      \"price\": 19.95\n    }\n  }\n}";
    var dataJson = JSON.parse(data);
    var dataStr = JSON.stringify(dataJson, null, 4);
    for (var i = 0; i < dataStr.length; i++) {
        if (dataStr[i] === '\n') {
            dataStr = dataStr.replace('\n', '\\n');
        }
    }
    console.log(dataStr);
});
//# sourceMappingURL=extension.test.js.map