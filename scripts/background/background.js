import browser from "webextension-polyfill";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:background");

import "../shared/dev_debug.js";
// import { getExtendedConfig } from "./utils.js";
// getExtendedConfig().then(config => debug("Config:", config));

browser.webNavigation.onHistoryStateUpdated.addListener(urlChanged);
browser.runtime.onInstalled.addListener(function() {
  browser.declarativeContent.onPageChanged.removeRules(undefined, function() {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "twitter.com" }
          }),
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "facebook.com" }
          }),
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "linkedin.com" }
          }),
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "youtube.com" }
          }),
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "reddit.com" }
          })
        ],
        actions: [new browser.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

//TODO: Send message to all tabs if relevant
function urlChanged() {
  browser.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTab = tabs[0]; //TODO: Is this really the active tab
    browser.tabs.sendMessage(activeTab.id, { message: "urlChanged" });
  });
}

browser.runtime.onMessage.addListener(request => {
  // the page *should* update, so make it update
  if (request.message === "pageShouldUpdate") {
    require("../shared/helpers.js").pageWillUpdate(request.hide);
  }
});
