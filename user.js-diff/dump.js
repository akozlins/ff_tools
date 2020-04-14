"use strict";

console.log(Services.prefs.getChildList('').map(key => {
    let value = undefined;

    switch(Services.prefs.getPrefType(key)) {
    case 32:
        value = Services.prefs.getStringPref(key);
        break;
    case 64:
        value = Services.prefs.getIntPref(key);
        break;
    case 128:
        value = Services.prefs.getBoolPref(key);
        break;
    }

    return `user_pref("${key}", "${value}");`;
}).join("\n");
