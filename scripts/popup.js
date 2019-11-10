import browser from "webextension-polyfill";

import { getDomainBackground, updateStorage } from "./shared/utils.js";

//TODO: Only add checkbox if this is a valid url for usage
//TODO: Error when popup is still around after a url update, need listener for

const checkbox = document.getElementById("hide");
updateCheckboxUiFromLocalStorage();

// look at local storage, and give the checkbox the right value
async function updateCheckboxUiFromLocalStorage() {
  const url = await getDomainBackground();

  const storage = await browser.storage.sync.get([url]);
  updateCheckboxState(storage.shouldHide);
}

// take a boolean and update the checkbox state
function updateCheckboxState(state) {
  checkbox.checked = state;
}

checkbox.onclick = async e => {
  const url = await getDomainBackground();
  console.log("Popup setting hide to ", e.target.checked);

  await updateStorage(url, { shouldHide: e.target.checked });
};
