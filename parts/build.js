/*jslint node: true, regexp: true, nomen: true */
/*global fs: true */
'use strict';

function read(path) {
    return fs.readFileSync(path, 'utf8');
}

function jsEscape(content) {
    return content.replace(/(['"\\])/g, '\\$1')
        .replace(/[\f]/g, "\\f")
        .replace(/[\b]/g, "\\b")
        .replace(/[\n]/g, "\\n")
        .replace(/[\t]/g, "\\t")
        .replace(/[\r]/g, "\\r")
        .replace(/[\u2028]/g, "\\u2028")
        .replace(/[\u2029]/g, "\\u2029");
}

function jsRead(path) {
    return jsEscape(read(path));
}

//Builds the xrayquire.js file by injecting templates into it.
var fs = require('fs'),
    dir = __dirname + '/',
    contents = read(dir + '../xrayquire.js'),
    tree = jsRead(dir + 'templates/tree.html'),
    treeDepItem = jsRead(dir + 'templates/treeDepItem.html'),
    treeItem = jsRead(dir + 'templates/treeItem.html');

contents = contents
           .replace(/treeHtml: '.*?',[\r\n]/, "treeHtml: '" + tree + "',\n")
           .replace(/treeDepItemHtml: '.*?',[\r\n]/, "treeDepItemHtml: '" + treeDepItem + "',\n")
           .replace(/treeItemHtml: '.*?',[\r\n]/, "treeItemHtml: '" + treeItem + "',\n");

fs.writeFileSync(dir + '../xrayquire.js', contents, 'utf8');
