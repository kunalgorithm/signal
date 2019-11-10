import browser from "webextension-polyfill";

export function getDomainContent() {
  return new URL(location.href).hostname;
}

export async function getDomainBackground() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  const url = activeTab.url;
  return new URL(url).hostname;
}
