import browser from "webextension-polyfill";

import { getDomain } from "./utils.js";

const timerID = "signal-domain-timer";
const NUDGE_INTERVAL = 30000;
//1,800	MAX_WRITE_OPERATIONS_PER_HOUR, so min TIMER_TICK is 2000
const TIMER_TICK = 15000;
const TIMER_SHOW_TIME = 7500;

class Timer {
  constructor() {
    this.domain = getDomain();
    this.addTimerToDOM();
    this.incrementDomainTimer = this.incrementDomainTimer.bind(this);
    this.nudge = this.nudge.bind(this);
    setInterval(this.incrementDomainTimer, TIMER_TICK);
    setInterval(this.nudge, NUDGE_INTERVAL);
  }

  async addTimerToDOM() {
    const domain = this.domain;
    const storage = await browser.storage.sync.get([domain]);
    const oldVal = storage[domain];
    let val;
    if (oldVal === undefined) {
      console.log("Initalized timer storage for ", domain);
      const newVal = { [domain]: 0 };
      await browser.storage.sync.set(newVal);
      val = 0;
    } else {
      val = oldVal;
    }

    console.log("Storage works like I think it does", storage);
    let timer = document.createElement("div");
    timer.setAttribute("id", timerID);
    timer.innerHTML = this.makeTimeHTML(val);
    console.log("Inserting timer into dom");
    document.body.appendChild(timer);
  }

  makeTimeHTML(rawS) {
    let minutes = Math.floor(rawS / 60);
    let seconds = rawS % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let timeString;
    if (minutes >= 60) {
      let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      timeString = hours + ":" + minutes + ":" + seconds;
    } else {
      timeString = minutes + ":" + seconds;
    }

    return `<div class='signal-small-text'> Time Today: </div> <div class='signal-time-text'>${timeString}</div>`;
  }

  async incrementDomainTimer() {
    const domain = this.domain;
    console.log("Incrementing domain timer for", domain);
    const storage = await browser.storage.sync.get([domain]);
    const oldVal = storage[domain];
    const newVal = oldVal
      ? { [domain]: oldVal + Math.floor(TIMER_TICK / 1000) }
      : { [domain]: Math.floor(TIMER_TICK / 1000) };
    await browser.storage.sync.set(newVal);
  }

  async nudge() {
    function shakeBody() {
      if (document.body.style.animation.includes("signal-shakeshake-2")) {
        document.body.style.animation =
          "signal-shakeshake 0.82s cubic-bezier(.36,.07,.19,.97) both";
      } else {
        document.body.style.animation =
          "signal-shakeshake-2 0.82s cubic-bezier(.36,.07,.19,.97) both";
      }
    }

    function addAndRemoveTimer() {
      timer.style.visibility = "visible";
      setTimeout(() => (timer.style.visibility = "hidden"), TIMER_SHOW_TIME);
    }

    const domain = this.domain;
    const storage = await browser.storage.sync.get([domain]);
    const timer = document.getElementById("signal-domain-timer");
    timer.innerHTML = this.makeTimeHTML(storage[domain]);

    shakeBody();
    addAndRemoveTimer();
  }
}

new Timer();
