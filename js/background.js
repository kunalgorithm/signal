chrome.webNavigation.onHistoryStateUpdated.addListener(urlChanged);

function urlChanged() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "urlChanged" });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // the page *should* update, so make it update
  if (request.message === "pageShouldUpdate") {
    require("./shared/helpers").pageWillUpdate(request.hide);
  }
});
