import browser from "webextension-polyfill";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:content");

import "../shared/dev_debug.js";
import siteConfig from "../shared/siteConfig.js";
import { getDomainContent } from "../shared/utils.js";
import Timer from "./timer.js";

init()
  .then(() => debug("Established Signal"))
  .catch(err => console.error("Content Script Error", err));

async function init() {
  const currentURL = getDomainContent();
  const storage = await browser.storage.sync.get([currentURL]);
  const urlStorage = storage[currentURL];
  let shouldHide;
  if (urlStorage === undefined || urlStorage.shouldHide === undefined) {
    //Dont worry if urlStorage is undefined, {...undefined} => {}
    await browser.storage.sync.set({
      [currentURL]: { ...urlStorage, shouldHide: true }
    });
    shouldHide = true;
  } else {
    shouldHide = urlStorage.shouldHide;
  }

  reloadContentScript(shouldHide);
  new Timer(); //only one timer per page
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
  const scriptRetrievalFt = siteConfig[currentURL];
  if (scriptRetrievalFt === undefined) {
    console.error(
      "No script for current domain, did you add the url to the siteConfig and the manifest.json"
    );
    return;
  }

  const script = scriptRetrievalFt();
  script.main(hide);
}
