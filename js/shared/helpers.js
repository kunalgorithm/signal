module.exports = {
  // sends a message that the state of "hidden" has changed, and your content script should do something about that
  // It tells you whether it has changed to hidden or changed to visible
  // i,e whether the user wants to see or hide their feed, etc.

  pageShouldUpdate: function() {
    chrome.storage.sync.get("hidenewsfeed", function(data) {
      let hide = !data.hidenewsfeed;
      chrome.storage.sync.set({ hidenewsfeed: hide }, function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id, {
            message: "pageShouldUpdate",
            hide
          });
        });
      });
    });
  }
};
