import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:content:utils");

let elementsHidden = [];

export function hideQuerySelector(selector) {
  const selectorEl = document.querySelector(selector);
  if (selectorEl === null) {
    debug(selector, "not found :( could be error");
    return;
  }

  hideEl(selectorEl);
}

export function hideEl(el) {
  //Instead of visibilty just move off page because weird to deal with svgs
  // https://github.com/highcharts/highcharts/issues/2597
  elementsHidden.push([el, el.style.position]);
  el.style.position = "relative";
  el.style.right = "2000em";
}

export function showAll() {
  elementsHidden.map(([e, position]) => {
    e.style.position = position;
  });
  elementsHidden = [];
}
