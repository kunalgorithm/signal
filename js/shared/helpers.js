module.exports = {
  // sends a message that the state of "hidden" has changed, and your content script should do something about that
  // It tells you whether it has changed to hidden or changed to visible
  // i,e whether the user wants to see or hide their feed, etc.
  toggleHide: function(cb) {
    chrome.storage.sync.get("hidenewsfeed", function(data) {
      let hide = !data.hidenewsfeed;
      chrome.storage.sync.set({ hidenewsfeed: hide }, function() {
        cb(hide);
      });
    });
  },
  // it will definitely update
  // Boolean hide - whether or not to hide all the stuff
  pageWillUpdate: function(hide) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        message: "pageWillUpdate",
        hide
      });
    });
  },
  // It *should* update, but wil it?
  pageShouldUpdate: function(hide) {
    chrome.runtime.sendMessage({
      message: "pageShouldUpdate",
      hide
    });
  },

  // get the localstorage key for a given domain
  getKeyForUrl: function(url) {
    let key = "";
    if (url.includes("facebook.com")) {
      key = "FACEBOOK";
    } else if (url.includes("twitter.com")) {
      key = "TWITTER";
    } else if (url.includes("linkedin.com")) {
      key = "LINKEDIN";
    } else {
      key = "TEST";
    }
    return key;
  }
};
