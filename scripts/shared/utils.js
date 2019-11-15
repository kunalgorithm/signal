import browser from "webextension-polyfill";

//These are the keys to local storage so must be in sync
export function getDomainContent() {
  return new URL(location.href).hostname;
}

export async function getDomainBackgroundA() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  const url = activeTab.url;
  return new URL(url).hostname;
}

export function getDomainFromURL(url) {
  return new URL(url).hostname;
}

//properly merge state for the url with the newValues overridding old ones
export async function updateStorage(url, newValues) {
  const storage = await browser.storage.sync.get([url]);
  const curStorage = storage[url];

  await browser.storage.sync.set({
    [url]: {
      ...curStorage,
      ...newValues
    }
  });
}
