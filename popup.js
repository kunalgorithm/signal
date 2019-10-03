const checkbox = document.getElementById("hide");
updateCheckboxUiFromLocalStorage();

// look at local storage, and give the ceckbox the right value
function updateCheckboxUiFromLocalStorage() {
  chrome.storage.sync.get("hidenewsfeed", function(data) {
    updateCheckboxState(data.hidenewsfeed);
  });
}

// take a boolean and update the checkbox state
function updateCheckboxState(state) {
  checkbox.checked = state;
}

checkbox.onclick = function(element) {
  pageShouldUpdate();
};

// sends a message that the state of "hidden" has changed, and your content script should do something about that
// It tells you whether it has changed to hidden or changed to visible
// i,e whether the user wants to see or hide their feed, etc.
function pageShouldUpdate() {
  chrome.storage.sync.get("hidenewsfeed", function(data) {
    let hide = !data.hidenewsfeed;
    chrome.storage.sync.set({ hidenewsfeed: hide }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          message: "pageShouldUpdate",
          hide
        });
      });
    });
  });
}

function forceCheck() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "forceCheck" });
  });
}

function reviveNewsfeed() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "reviveNewsfeed" });
  });
}
console.log("hi");
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var activeTab = tabs[0];
  console.log("my yung url thooooo", activeTab.url);
});
