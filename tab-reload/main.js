"use strict";

function create(id, title) {
    browser.menus.create({
        id : "" + id
      , title : title
      , contexts : [ "tab" ]
//      , type : "radio"
    });
}

create(0, "off");
create(5, "5s");
create(300, "5m");
create(3600, "1h");
create(18000, "5h");

let timers = {};

browser.storage.local.get({ timers : {} })
.then(async (results) => {
    console.debug("reload:", "timers =", results.timers);
    for(let tabId in results.timers) {
        let tab = await browser.tabs.get(parseInt(tabId));
        console.debug("reload:", "tab =", tab);
        let { interval } = results.timers[tabId];
        console.debug("reload:", "set interval", interval);
        setReload(tab, interval);
    }
    browser.storage.local.set({ timers : timers });
});

function setReload(tab, interval) {
    if(timers[tab.id]) {
        console.debug("reload:", "clear interval", timers[tab.id].intervalId);
        window.clearInterval(timers[tab.id].intervalId);
        delete timers[tab.id];
    }
    if(interval <= 0) return;
    timers[tab.id] = {
        interval : interval,
        intervalId : window.setInterval(() => {
            console.debug("reload:", "tabId =", tab.id);
            browser.tabs.reload(tab.id);
        }, 1000 * interval)
    };
}

async function onClick(info, tab) {
    console.debug("reload:", "info =", info, "tab =", tab);
    await browser.menus.update(info.menuItemId, { checked : true });

    let interval = parseInt(info.menuItemId);
    setReload(tab, interval);
    browser.storage.local.set({ timers : timers });
}

browser.menus.onClicked.addListener(onClick);
