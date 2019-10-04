module.exports = { main };

function hideEl(el) {
  // https://github.com/highcharts/highcharts/issues/2597
  // SVGS are annoying to deal with, they take some time to load and override the visilibity setting in linkedin
  el.style.position = "relative";
  el.style.top = "-999em";
}

function main(hide) {
  console.log("🤦‍ running linkedin script");

  if(hide) {
    //remove messaging bar
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
    //remove feed
  
    //remove sidebar
    function removeSideBar() {
        const sidebar = document.querySelector('.right-rail');
        if(sidebar !== null) {
          hideEl(sidebar);
        }
        //sidebar should be available at start if its there
    }
  
    removeSideBar();
  }

}