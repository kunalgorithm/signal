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
  console.log("Hello, I am being caallled my boy");
  const currentURL = location.href;
  console.log("Establishing Signal");

  if (currentURL.includes("facebook.com")) {
    require("./facebook/facebook.js").facebook();
  } else if (currentURL.includes("twitter.com")) {
    require("./twitter/twitter.js").main(hide);
  } else {
    require("./test.js");
  }
}
