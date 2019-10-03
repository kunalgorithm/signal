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
  require("./shared/helpers").pageShouldUpdate();
};

console.log("hi");
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var activeTab = tabs[0];
  console.log("my yung url thooooo", activeTab.url);
});
