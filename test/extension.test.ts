//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
// import * as helper from '../src/help/helper';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {
    // Defines a Mocha unit test
    // test("Something 1", () => {
    //     assert.equal(-1, [1, 2, 3].indexOf(5));
    //     assert.equal(-1, [1, 2, 3].indexOf(0));
    // });

    let data = `{
  "store": {
    "book": [ 
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      }, {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }, {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }, {
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
}`;

    let dataJson = JSON.parse(data);

    let dataStr = JSON.stringify(dataJson, null, 4);

    for(let i = 0; i < dataStr.length; i++) {
        if(dataStr[i] === '\n') {
            dataStr = dataStr.replace('\n', '\\n');
        }
    }

    console.log(dataStr);
    
});
