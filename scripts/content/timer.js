const timerID = "signal-domain-timer";
const nudgeInterval = 900000;
// const nudgeInterval = 9000;

function makeTimeString(rawS) {
  const minutes = Math.floor(rawS / 60);
  let seconds = rawS % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    "<div class='signal-small-text'> Time Today: </div> <div class='signal-time-text'>" +
    minutes +
    ":" +
    seconds +
    "</div>"
  );
}

function addTimerToDOM() {
  const domain = new URL(location.href).hostname;
  chrome.storage.sync.get([domain], storage => {
    let timer = document.createElement("div");
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
    const newVal = oldVal ? { [domain]: oldVal + 30 } : { [domain]: 30 };
    chrome.storage.sync.set(newVal);
    const timer = document.getElementById("signal-domain-timer");
    timer.innerHTML = makeTimeString(newVal[domain]);
  });
}

function nudge() {
  function shakeBody() {
    if (document.body.style.animation.includes("signal-shakeshake-2")) {
      document.body.style.animation =
        "signal-shakeshake 0.82s cubic-bezier(.36,.07,.19,.97) both";
    } else {
      document.body.style.animation =
        "signal-shakeshake-2 0.82s cubic-bezier(.36,.07,.19,.97) both";
    }
  }

  const timer = document.getElementById("signal-domain-timer");

  function addAndRemoveTimer() {
    timer.style.visibility = "visible";
    setTimeout(() => (timer.style.visibility = "hidden"), 7500);
  }

  shakeBody();
  addAndRemoveTimer();
}

function initStorage() {
  const domain = new URL(location.href).hostname;

  chrome.storage.sync.get([domain], storage => {
    const oldVal = storage[domain];

    if (oldVal === undefined) {
      console.log("Initalized timer storage for ", domain);
      const newVal = { [domain]: 0 };
      chrome.storage.sync.set(newVal);
    }
  });
}

addTimerToDOM();
initStorage();
setInterval(incrementDomainTimer, 30000);
setInterval(nudge, nudgeInterval);
