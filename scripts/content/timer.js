import browser from "webextension-polyfill";
import moment from "moment";

import { getDomainContent, updateStorage } from "../shared/utils.js";

const TIMER_ID = "signal-domain-timer";
const NUDGE_INTERVAL = 30000;
//1,800	MAX_WRITE_OPERATIONS_PER_HOUR, so min TIMER_TICK is 2000
const TIMER_TICK = 15000;
const TIMER_SHOW_TIME = 7500;

export default class Timer {
  constructor() {
    this.domain = getDomainContent();
    this.addTimerToDOM();
    this.incrementDomainTimer = this.incrementDomainTimer.bind(this);
    this.nudge = this.nudge.bind(this);
    this.updateTimerHTML = this.updateTimerHTML.bind(this);
    setInterval(this.incrementDomainTimer, TIMER_TICK);
    setInterval(this.nudge, NUDGE_INTERVAL);
  }

  async initStorage() {
    const domain = this.domain;

    const storage = await browser.storage.sync.get([domain]);
    const domainStorage = storage[domain];

    const today = moment().format("MM-DD-YYYY");
    if (
      domainStorage.lastDateVisited === undefined ||
      domainStorage.lastDateVisited !== today
    ) {
      updateStorage(domain, { lastDateVisited: today, timeSpentToday: 0 });
    }
  }

  async addTimerToDOM() {
    await this.initStorage();

    let timer = document.createElement("div");
    timer.setAttribute("id", TIMER_ID);
    document.body.appendChild(timer);
    console.log("Inserting timer into dom");
    await this.updateTimerHTML();
  }

  async updateTimerHTML(newTime) {
    if (newTime === undefined) {
      const domain = this.domain;
      const storage = await browser.storage.sync.get([domain]);
      const domainStorage = storage[domain];
      newTime = domainStorage.timeSpentToday;
    }

    const timer = document.getElementById(TIMER_ID);
    timer.innerHTML = this.makeTimeHTML(newTime);
    this.timerHTMLTime = newTime;
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
    //only increment if document is current visible
    if (document.visibilityState === "visible") {
      const domain = this.domain;
      const storage = await browser.storage.sync.get([domain]);
      const domainStorage = storage[domain];
      const { timeSpentToday } = domainStorage;
      const currentTime = timeSpentToday + Math.floor(TIMER_TICK / 1000);
      await updateStorage(domain, { timeSpentToday: currentTime });
    }
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

    //need to preserve this ptr so arrow ft
    const addAndRemoveTimer = () => {
      const timer = document.getElementById(TIMER_ID);
      timer.style.visibility = "visible";
      const intervalID = setInterval(
        () => this.updateTimerHTML(this.timerHTMLTime + 1),
        1000
      );
      setTimeout(() => {
        timer.style.visibility = "hidden";
        clearInterval(intervalID);
      }, TIMER_SHOW_TIME);
    };

    await this.updateTimerHTML();
    shakeBody();
    addAndRemoveTimer();
  }
}
