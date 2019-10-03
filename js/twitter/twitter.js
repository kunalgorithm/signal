module.exports = { main };

function main(hide) {
  console.log("honey i'm called");
  burnNewsFeedIfOnHomePage();

  const newsFeedSelector = '[data-testid="primaryColumn"]';
  if (hide) {
    burnNewsFeedIfOnHomePage();
  } else {
    reviveNewsfeedIfOnHomePage();
  }

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
      if (
        !data.hidenewsfeed &&
        currentPage[currentPage.length - 1] === "home"
      ) {
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
        window.scrollTo(0, 0); // cuz twitter scrolls you down automatically :(
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
