import browser from "webextension-polyfill";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:utils");

function promiseIdentity() {
  return new Promise((resolve, reject) => {
    browser.identity.getProfileUserInfo(userInfo => {
      if (browser.runtime.lastError) {
        reject(browser.runtime.lastError.message);
        return;
      }
      resolve(userInfo);
    });
  });
}

let eConfig; //singleton
export async function getExtendedConfig() {
  if (eConfig === undefined) {
    const pluginInfo = await browser.management.getSelf();
    let config;
    if (pluginInfo.installType === "development") {
      localStorage.debug = "app:*";
      config = require("../config/dev.json");
    } else {
      config = require("../config/prod.json");
    }

    const userInfo = await promiseIdentity();
    // this won't change between calls
    // eslint-disable-next-line require-atomic-updates
    eConfig = { ...config, ...userInfo };
  }

  return eConfig;
}
