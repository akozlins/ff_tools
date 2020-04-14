#!/usr/bin/node

"use strict";

let fs = require("fs");

let prefs = new Map();
let user_pref = function (key, value) {
    prefs.set(key, value);
}
eval("" + fs.readFileSync(process.argv[2]));

user_pref = function (key, value) {
    let value1 = prefs.get(key);
    prefs.delete(key);

    if(value1 === undefined) {
        console.log("+ " + key + " = " + value);
        return;
    }

    if(value !== value1) {
        console.log("  " + key + " = " + value + " (" + value1 + ")");
        return;
    }
}
eval("" + fs.readFileSync(process.argv[3]));
prefs.forEach((value, key) => {
    console.log("- " + key + " = " + value);
});
