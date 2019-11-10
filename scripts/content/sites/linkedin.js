module.exports = { main };

let elementsHidden = [];

function hideEl(el) {
  //Instead of visibilty just move off page because weird to deal with svgs
  // https://github.com/highcharts/highcharts/issues/2597
  el.style.position = "relative";
  el.style.right = "2000em";
  elementsHidden.push(el);
}

function showLinkedin() {
  console.log("SHOW", elementsHidden, elementsHidden.length);
  elementsHidden.map(e => {
    e.style.position = "static";
  });
  elementsHidden = [];
}

function main(hide) {
  console.log("🤦‍ running linkedin script");

  if (hide) {
    hideLinkedin();
  } else {
    showLinkedin();
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
