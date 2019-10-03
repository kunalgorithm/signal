module.exports = {twitter}

function main(){
  burnNewsFeedIfOnHomePage();

const newsFeedSelector = '[data-testid="primaryColumn"]';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // if (request.message === "forceCheck") {
  //   burnNewsFeedIfOnHomePage();
  // } else if (request.message === "reviveNewsfeed") {
  //   reviveNewsfeedIfOnHomePage();
  // }
  // the state was changed, do something about it
  if (request.message === "pageShouldUpdate") {
    if (request.hide) {
      burnNewsFeedIfOnHomePage();
    } else {
      reviveNewsfeedIfOnHomePage();
    }
  }
});

function burnNewsFeedIfOnHomePage() {
  chrome.storage.sync.get("hidenewsfeed", function(data) {
    let currentPage = location.href.split("/");
    if (data.hidenewsfeed && currentPage[currentPage.length - 1] === "home") {
      // if we are on the homepage of twitter
      searchAndDestroy();
    }
  });
}

function reviveNewsfeedIfOnHomePage() {
  chrome.storage.sync.get("hidenewsfeed", function(data) {
    let currentPage = location.href.split("/");
    if (!data.hidenewsfeed && currentPage[currentPage.length - 1] === "home") {
      // if we are on the homepage of twitter
      searchAndRevive();
    }
  });
}

function searchAndDestroy() {
  var checkTimer = setInterval(killNewsfeed, 200);
  let checkCount = 0;
  killNewsfeed();
  function killNewsfeed() {
    checkCount += 1;
    let newsfeed = document.querySelector(newsFeedSelector);
    if (newsfeed) {
      console.log("Burning the Newsfeed");
      $(window).scrollTop(0); // cuz twitter scrolls you down automatically :(
      clearInterval(checkTimer);
      newsfeed.style.visibility = "hidden";
    }

    if (checkCount === 100) {
      console.log(
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
    if (newsfeed) {
      console.log("Reviving the Newsfeed");
      clearInterval(checkTimer);
      newsfeed.style.visibility = "visible";
    }

    if (checkCount === 100) {
      console.log(
        "Couldn't find the newsfeed. Maybe Twitter changed their design again..."
      );
      clearInterval(checkTimer);
    }
  }
}

}