const getKey = require("./shared/helpers").getKeyForUrl;

const checkbox = document.getElementById("hide");
updateCheckboxUiFromLocalStorage();

// look at local storage, and give the ceckbox the right value
function updateCheckboxUiFromLocalStorage() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    const url = activeTab.url;
    const key = getKey(url);
    chrome.storage.sync.get([key], function(data) {
      console.log(data);
      updateCheckboxState(data[key]);
      require("./shared/helpers").pageShouldUpdate(data[key]);
    });
  });
}

// take a boolean and update the checkbox state
function updateCheckboxState(state) {
  checkbox.checked = state;
}

checkbox.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    const url = activeTab.url;
    require("./shared/helpers").toggleHide(
      getKey(url),
      require("./shared/helpers").pageShouldUpdate
    );
  });
};
