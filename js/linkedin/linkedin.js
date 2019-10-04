module.exports = { main };

let elementsHidden = [];

function hideEl(el) {
  //Instead of visibilty just move off page because weird to deal with svgs
  // https://github.com/highcharts/highcharts/issues/2597
  // Actually store prior style in DOM
  el.signal_prior_style = {position: el.style.position, right: el.style.right};
  el.style.position = "relative";
  el.style.right = "2000em";
  elementsHidden.push(el);
  console.log("HIDE", elementsHidden);
}

function showLinkedin() {
  console.log("SHOW", elementsHidden, elementsHidden.length);
  elementsHidden.map(e => {
    if(e.signal_prior_style !== undefined) {
      e.style.position = e.signal_prior_style.position;
      e.style.right = e.signal_prior_style.right;
      e.signal_prior_style = undefined;
    } else {
      console.log("Overlapping calls is the problem");
    }
  });
  elementsHidden = [];
}

function main(hide) {
  console.log("🤦‍ running linkedin script");

  if(hide) {
    hideLinkedin();
  } else {
    showLinkedin();
  }
}

function hideLinkedin() {
  function removeMessagingBar() {
    const myInterval = setInterval(() => {
      const msgBar = document.querySelector('#msg-overlay');
      if(msgBar === null) {
        return;
      } else {
        hideEl(msgBar);
        clearInterval(myInterval);
      }
    }, 333);
  }

  const currentURL = location.href;
  if(currentURL.includes("linkedin.com/feed/")) {
    
  }

  removeMessagingBar();

  function removeFeed() {
    const feedEl = document.querySelector('.feed-shared-update-v2');
    if(feedEl !== null) {
      const feedContainer = feedEl.parentElement.parentElement;
      hideEl(feedContainer);
      // const feedDropDown = feedContainer.previousSibling();
      // feedDropDown.style.visibility = "hidden";
    }
  }

  removeFeed();

  function removeSideBar() {
      const sidebar = document.querySelector('.right-rail');
      if(sidebar !== null) {
        hideEl(sidebar);
      }
      //sidebar should be available at start if its there
  }

  removeSideBar();
}