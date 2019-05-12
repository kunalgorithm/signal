// Runs the content script if HTML5 pushState() is used
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null, {file:"js/displayMatch.js"});
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "gid") {
        chrome.identity.getProfileUserInfo(function(userInfo){
            console.log('Student ID: ', userInfo.id);
            sendResponse(userInfo);
        });
        return true;
      }
});

