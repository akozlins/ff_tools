"use strict";

let wid;
async function getCurrentWindow() {
    let w = await browser.windows.getCurrent({});
    console.log("retach:", "currentWindow =", w);
    wid = w.id;
}
getCurrentWindow();

let busy = false;

async function onDetach(tabId, info) {
    if(busy) return;
    busy = true;

    let props = {
        windowId : info.oldWindowId,
        index : info.oldPosition
    };

    let tab = await browser.tabs.get(tabId);
    console.log("retach:", "wid =", wid, "tab.windowId =", tab.windowId);
    console.log("retach/before:", "tab =", tab);
    let tabs = await browser.tabs.move(tabId, props);
    for(let i = 0; i < tabs.length; i++) {
        let tab = await browser.tabs.update(tabs[i].id, { active : true });
        console.log("retach/after:", "tab =", tab);
    }

    busy = false;
}

browser.tabs.onDetached.addListener(onDetach);
