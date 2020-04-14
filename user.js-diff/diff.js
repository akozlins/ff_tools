"use strict";

let fs = require("fs");

let prefs = new Map();
let user_pref = function (key, value) {
    prefs.set(key, value);
}
eval("" + fs.readFileSync("user.js/user.js"));

user_pref = function (key, value) {
    let value1 = prefs.get(key);
    prefs.delete(key);

    if(!value1) {
        console.log("+ " + key + " = " + value);
        return;
    }

    if(value !== value1) {
        console.log("  " + key + " = " + value + " (" + value1 + ")");
        return;
    }
}
eval("" + fs.readFileSync("ghacks-user.js/user.js"));
prefs.forEach((value, key) => {
    console.log("- " + key + " = " + value);
});
