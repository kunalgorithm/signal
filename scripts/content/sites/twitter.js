module.exports = { main };

import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:twitter");

function main(hide) {
  debug("🏃‍♂ running twitter.js", hide);

  const sidebarSelector = '[data-testid="sidebarColumn"]';
  const newsFeedSelector = '[data-testid="primaryColumn"]';
  if (hide) {
    burnNewsFeedIfOnHomePage();
  } else {
    reviveNewsfeedIfOnHomePage();
  }

  function burnNewsFeedIfOnHomePage() {
    let currentPage = location.href.split("/");
    if (currentPage[currentPage.length - 1] === "home") {
      // if we are on the homepage of twitter
      searchAndDestroy();
    }
  }

  function reviveNewsfeedIfOnHomePage() {
    let currentPage = location.href.split("/");
    if (currentPage[currentPage.length - 1] === "home") {
      // if we are on the homepage of twitter
      searchAndRevive();
    }
  }

  function searchAndDestroy() {
    var checkTimer = setInterval(killNewsfeed, 200);
    let checkCount = 0;
    killNewsfeed();
    function killNewsfeed() {
      checkCount += 1;
      let newsfeed = document.querySelector(newsFeedSelector);
      let sidebar = document.querySelector(sidebarSelector);
      if (newsfeed) {
        debug("Burning the Newsfeed");
        window.scrollTo(0, 0); // cuz twitter scrolls you down automatically :(
        clearInterval(checkTimer);
        // newsfeed.style.visibility = "hidden";
        // let childNodes = newsfeed.firstElementChild.childNodes;
        // for (let i = 3; i < childNodes.length; i++) {
        //   childNodes[i].style.visibility = "hidden";
        // }
        let magic = newsfeed.firstElementChild.lastElementChild;
        magic.style.visibility = "hidden";
      }
      if (sidebar) {
        debug("Burning the Sidebar");
        window.scrollTo(0, 0); // cuz twitter scrolls you down automatically :(
        clearInterval(checkTimer);
        sidebar.style.visibility = "hidden";
      }

      if (checkCount === 100) {
        debug(
          "Couldn't find the newsfeed. Maybe Twitter changed their design again..."
        );
        clearInterval(checkTimer);
      }
    }
  }

  function searchAndRevive() {
    var checkTimer = setInterval(reviveNewsfeed, 200);
    let checkCount = 0;
    reviveNewsfeed();
    function reviveNewsfeed() {
      checkCount += 1;
      let newsfeed = document.querySelector(newsFeedSelector);
      let sidebar = document.querySelector(sidebarSelector);

      if (newsfeed) {
        debug("Reviving the Newsfeed");
        clearInterval(checkTimer);
        let magic = newsfeed.firstElementChild.lastElementChild;
        magic.style.visibility = "visible";
      }
      if (sidebar) {
        debug("Reviving the Sidebar");
        clearInterval(checkTimer);
        sidebar.style.visibility = "visible";
      }

      if (checkCount === 100) {
        debug(
          "Couldn't find the newsfeed. Maybe Twitter changed their design again..."
        );
        clearInterval(checkTimer);
      }
    }
  }
}
