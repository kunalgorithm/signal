import browser from "webextension-polyfill";
//only use debug in background script
import debugMaker from "debug";
const debug = debugMaker("app:dev_debug");

//if in background script
if (browser.management) {
  browser.management.getSelf().then(pluginInfo => {
    if (pluginInfo.installType === "development") {
      localStorage.debug = "app:*";
      debug("Starting debug mode");
    }
  });
}

//Debug local storage changes
browser.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    let storageChange = changes[key];
    //not all in `` b/c it abbreivates objs there
    console.log(
      `${namespace} ${key} changed from`,
      storageChange.oldValue,
      "to",
      storageChange.newValue
    );
  }
});

//Debug messages
browser.runtime.onMessage.addListener(msg => {
  console.log("Msg recieved", msg);
});
