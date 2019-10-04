chrome.webNavigation.onHistoryStateUpdated.addListener(urlChanged);
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "twitter.com" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "facebook.com" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "linkedin.com" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "youtube.com" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "reddit.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

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
