module.exports = { main };

import { hideEl, showAll } from "../utils.js";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:linkedin");

function main(hide) {
  debug("🤦‍ running linkedin script", hide);

  if (hide) {
    hideLinkedin();
  } else {
    showAll();
  }
}

function hideLinkedin() {
  function removeMessagingBar() {
    function removeMB() {
      const msgBar = document.querySelector("#msg-overlay");
      if (msgBar === null) {
        return;
      } else {
        hideEl(msgBar);
        clearInterval(myInterval);
      }
    }
    const myInterval = setInterval(removeMB, 333);
    removeMB();
  }

  removeMessagingBar();

  function removeFeed() {
    const feedEl = document.querySelector(".feed-shared-update-v2");
    if (feedEl !== null) {
      const feedContainer = feedEl.parentElement.parentElement;
      hideEl(feedContainer);
      // const feedDropDown = feedContainer.previousSibling();
      // feedDropDown.style.visibility = "hidden";
    }
  }

  removeFeed();

  function removeSideBar() {
    const sidebar = document.querySelector(".right-rail");
    if (sidebar !== null) {
      hideEl(sidebar);
    }
    //sidebar should be available at start if its there
  }

  removeSideBar();
}
