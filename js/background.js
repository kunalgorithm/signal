// Runs the content script if HTML5 pushState() is used
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null, {file:"js/displayMatch.js"});
});