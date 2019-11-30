import browser from "webextension-polyfill";
import moment from "moment";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:timer");

import { getDomainContent, updateStorage } from "../shared/utils.js";

//1,800	MAX_WRITE_OPERATIONS_PER_HOUR, so min TIMER_TICK is 2000
const TIMER_ID = "signal-domain-timer";
const TIMER_SHOW_TIME = 9000;

export default class Timer {
  constructor() {
    this.domain = getDomainContent();
    this.nudge = this.nudge.bind(this);
    this.updateTimerHTML = this.updateTimerHTML.bind(this);
    browser.runtime.onMessage.addListener(msg => {
      if (msg.type === "nudge") {
        this.nudge();
        return;
      }
    });
    this.initStorage().catch(err =>
      console.error("Failed to init storage", err)
    );
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

  addTimerToDOM() {
    let timer = document.createElement("div");
    timer.setAttribute("id", TIMER_ID);
    document.body.appendChild(timer);
    debug("Inserted timer into dom");
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

  async nudge() {
    debug("Nudging");

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
      let timer = document.getElementById(TIMER_ID);
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

    let timer = document.getElementById(TIMER_ID);
    if (timer === null) {
      this.addTimerToDOM();
      timer = document.getElementById(TIMER_ID);
    }
    await this.updateTimerHTML();
    shakeBody();
    addAndRemoveTimer();
  }
}
