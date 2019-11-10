import browser from "webextension-polyfill";

import "../shared/dev_debug.js";

console.log("Signal content script runs");

const getKey = require("../shared/helpers").getKeyForUrl;

init();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "urlChanged") {
    const currentURL = location.href;
    const key = getKey(currentURL);
    chrome.storage.sync.get([key], function(data) {
      reloadContentScript(data[key]);
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // the state was changed, do something about it
  if (request.message === "pageWillUpdate") {
    reloadContentScript(request.hide);
  }
});

// mercurymessagesCountValue

// initialize on page load
function init() {
  const currentURL = location.href;
  const key = getKey(currentURL);
  chrome.storage.sync.get([key], function(data) {
    require("../shared/helpers").pageShouldUpdate(data[key]);
  });
}

function reloadContentScript(hide) {
  const currentURL = location.href;
  console.log("Establishing Signal");
  let websiteModule = null;
  /* 
  How to add your module by Dmitri
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Your module must export a function called main

  module.exports = {
    main: function(hide){}
  }

  main receives one argument called "hide"

  hide is a Boolean that says whether or not to hide the feed etc.

  IMPORTANT: Your module should do something when hide is true AND when hide is false
  Hide is false means the user is toggling the hiding off
  which means you should make everything re-appear

  :)

  */
  let shouldAddTimer = true;
  if (currentURL.includes("facebook.com")) {
    websiteModule = require("./sites/facebook.js");
  } else if (currentURL.includes("twitter.com")) {
    websiteModule = require("./sites/twitter.js");
  } else if (currentURL.includes("youtube.com")) {
    websiteModule = require("./sites/youtube.js");
  } else if (currentURL.includes("linkedin.com")) {
    websiteModule = require("./sites/linkedin.js");
  } else if (currentURL.includes("reddit.com")) {
    websiteModule = require("./sites/reddit.js");
  } else {
    shouldAddTimer = false;
    websiteModule = require("./sites/test.js");
  }

  if (shouldAddTimer) {
    require("./timer.js");
  }

  websiteModule.main(hide);
}
