import browser from "webextension-polyfill";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:background");

import "../shared/dev_debug.js";
// import { getExtendedConfig } from "./utils.js";
// getExtendedConfig().then(config => debug("Config:", config));

async function updateCheckboxUiFromLocalStorage() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  console.log(activeTab);
}

updateCheckboxUiFromLocalStorage();
