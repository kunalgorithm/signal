import browser from "webextension-polyfill";

import "../shared/dev_debug.js";

import { getDomainContent } from "../shared/utils.js";

init()
  .then(() => console.log("Established Signal"))
  .catch(err => console.error("Content Script Error", err));

async function init() {
  const currentURL = getDomainContent();
  const storage = await browser.storage.sync.get([currentURL]);
  console.log({ storage });
  const urlStorage = storage[currentURL];
  let shouldHide;
  if (urlStorage === undefined || urlStorage.shouldHide === undefined) {
    //{...undefined} => {}
    await browser.storage.sync.set({
      [currentURL]: { ...urlStorage, shouldHide: true }
    });
    shouldHide = true;
  } else {
    shouldHide = urlStorage.shouldHide;
  }

  reloadContentScript(shouldHide);
}

//Debug local storage changes
browser.storage.onChanged.addListener(changes => {
  const currentURL = getDomainContent();
  const newURLChange = changes[currentURL];
  if (!newURLChange) {
    return;
  }

  const curShouldHide = newURLChange.newValue.shouldHide;
  if (newURLChange.oldValue.shouldHide !== curShouldHide) {
    console.log("Reloading content script to ", curShouldHide);
    reloadContentScript(curShouldHide);
  }
});

function reloadContentScript(hide) {
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
  const currentURL = getDomainContent();
  let websiteModule = null;
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
    // require("./timer.js");
  }

  websiteModule.main(hide);
}
