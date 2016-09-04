//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import * as helper from '../src/help/helper';

// Defines a Mocha test suite to group tests of similar kind together

suite("Extension Tests", () => {
    // Defines a Mocha unit test
    // test("Something 1", () => {
    //     assert.equal(-1, [1, 2, 3].indexOf(5));
    //     assert.equal(-1, [1, 2, 3].indexOf(0));
    // });
    // var dom = require('xmldom').DOMParser
    // var xmlSerializer = require('xmldom').XMLSerializer
    // var xml = "<book><title><aa>Harry Potter</aa></title><title><aa>Harry Potter</aa></title></book>"
    // var document = new dom().parseFromString(xml)
    // xml = new xmlSerializer().serializeToString(helper.xpath_hightlight(document, "//title", function (tagName) { return "$$$" }))
    // console.log(helper.formatXml(xml))
    let text = vscode.window.activeTextEditor.document.getText();
    
});