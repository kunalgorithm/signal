import browser from "webextension-polyfill";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:background");

import "../shared/dev_debug.js";
import { getDomainBackgroundA, updateStorage } from "../shared/utils.js";
import siteConfig from "../shared/siteConfig.js";

browser.runtime.onInstalled.addListener(() => {
  for (let domain of Object.keys(siteConfig)) {
    updateStorage(domain, { shouldHide: true });
  }
});

const TICK = "tick";
const TIMER_TICK = 60;
const NUDGE_TICK = TIMER_TICK * 15;
const periodInMinutes = TIMER_TICK / 60;
browser.alarms.create(TICK, { periodInMinutes });

browser.alarms.onAlarm.addListener(a => {
  if (a.name === TICK) {
    debug("Alarm tick", a);
    handleTick().catch(err => console.error("Tick failed", err));
  }
});

async function handleTick() {
  const domain = await getDomainBackgroundA();
  const storage = await browser.storage.sync.get([domain]);
  const domainStorage = storage[domain];
  if (domainStorage === undefined) return; //active tab is page without content script injected
  const { timeSpentToday } = domainStorage;
  const currentTime = timeSpentToday + TIMER_TICK;
  await updateStorage(domain, { timeSpentToday: currentTime });

  if (currentTime % NUDGE_TICK === 0) {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });
    await browser.tabs.sendMessage(tabs[0].id, { type: "nudge" });
  }
}
