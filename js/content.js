// @ts-nocheck
init();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "urlChanged") {
    chrome.storage.sync.get("hidenewsfeed", function(data) {
      reloadContentScript(data.hidenewsfeed);
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // the state was changed, do something about it
  if (request.message === "pageWillUpdate") {
    reloadContentScript(request.hide);
  }
});

// initialize on page load
function init() {
  chrome.storage.sync.get("hidenewsfeed", function(data) {
    require("./shared/helpers").pageShouldUpdate(data.hidenewsfeed);
  });
}

function reloadContentScript(hide) {
  const currentURL = location.href;
  console.log("Establishing Signal");
  let websiteModule = null;
  /* 
  How to add your module by Dmitri
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Your module must export a function called main

  module.exports = {
    main: function(hide){}
  }

  main receives one argument called "hide"

  hide is a Boolean that says whether or not to hide the feed etc.

  IMPORTANT: Your module should do something when hide is true AND when hide is false
  Hide is false means the user is toggling the hiding off
  which means you should make everything re-appear

  :)

  */
  if (currentURL.includes("facebook.com")) {
    websiteModule = require("./facebook/facebook.js");
  } else if (currentURL.includes("twitter.com")) {
    websiteModule = require("./twitter/twitter.js");
  } else if (currentURL.includes("linkedin.com")) {
    websiteModule = require("./linkedin/linkedin.js");
  } else {
    websiteModule = require("./test.js");
  }
  websiteModule.main(hide);
}


const timerID = "signal-domain-timer";
const nudgeInterval = 30000;

function makeTimeString(rawS) {
    const minutes = Math.floor(rawS / 60);
    let seconds = rawS % 60;
    if(seconds < 10) {
        seconds = "0" + seconds;
    }

    return "<div class='signal-small-text'> Time Today: </div> <div class='signal-time-text'>" + minutes + ":" + seconds + "</div>";
}

function addTimerToDOM() {
    const domain = new URL(location.href).hostname;
    chrome.storage.sync.get([domain], storage => {
        let timer = document.createElement('div');
        timer.setAttribute("id", timerID);
        timer.innerHTML = makeTimeString(storage[domain]);
        console.log("Inserting timer into dom");
        document.body.appendChild(timer);
    });
}

function incrementDomainTimer() {
    const domain = new URL(location.href).hostname;
    // console.log("Incrementing domain timer for", domain);
    chrome.storage.sync.get([domain], storage => {
        const oldVal = storage[domain];
        const newVal = oldVal ? {[domain]: oldVal + 1} : {[domain]: 1};
        chrome.storage.sync.set(newVal);
        const timer = document.getElementById("signal-domain-timer");
        timer.innerHTML = makeTimeString(newVal[domain]);
    });
}

function nudge() {
    function shakeBody() {
        if(document.body.style.animation.includes("signal-shakeshake-2")) {
            document.body.style.animation = "signal-shakeshake 0.82s cubic-bezier(.36,.07,.19,.97) both";
        } else {
            document.body.style.animation = "signal-shakeshake-2 0.82s cubic-bezier(.36,.07,.19,.97) both";
        }
    }

    const timer = document.getElementById("signal-domain-timer");

    function addAndRemoveTimer() {
        timer.style.visibility = "visible";
        setTimeout(() => timer.style.visibility = "hidden", 7500);
    } 

    shakeBody();
    addAndRemoveTimer();
}

addTimerToDOM();
setInterval(incrementDomainTimer, 1000);
setInterval(nudge, nudgeInterval);


