init();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "urlChanged") {
    chrome.storage.sync.get("hidenewsfeed", function(data) {
      reloadContentScript(data.hidenewsfeed);
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // the state was changed, do something about it
  if (request.message === "pageWillUpdate") {
    reloadContentScript(request.hide);
  }
});

// initialize on page load
function init() {
  chrome.storage.sync.get("hidenewsfeed", function(data) {
    require("./shared/helpers").pageShouldUpdate(data.hidenewsfeed);
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
  if (currentURL.includes("facebook.com")) {
    websiteModule = require("./facebook/facebook.js");
  } else if (currentURL.includes("twitter.com")) {
    websiteModule = require("./twitter/twitter.js");
  } else {
    websiteModule = require("./test.js");
  }
  websiteModule.main(hide);
}
