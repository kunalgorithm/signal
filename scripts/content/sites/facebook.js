module.exports = { main };

import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:facebook");

debug("🤦‍ running facebook script");

let child;
let parent;
let counter;
let paginateCount;

function main(hide) {
  debug("🤦‍ running linkedin script", hide);

  if (paginateCount === undefined) paginateCount = 0;

  if (counter === undefined) counter = 0;
  else counter++;

  if (counter == 0) {
    debug("Screw the first time");
    return;
  }
  readNextPage();
  removeNextPage();

  let chatBar = document.getElementsByClassName("fbDock")[0];
  let leftBar = document.getElementById("left_nav_section_nodes");
  let newsFeed = document.querySelectorAll('[role="region"]');
  debug("NF", newsFeed);

  if (hide) {
    chatBar.style.visibility = "hidden";
    // leftBar.style.visibility = "hidden"

    if (newsFeed.length == 2) {
      newsFeed[1].style.visibility = "hidden";
    }
  } else {
    chatBar.style.visibility = "visible";
    // leftBar.style.visibility = "visible"

    if (newsFeed.length == 2) {
      newsFeed[1].style.visibility = "visible";
    }
  }
}

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

let newsFeedDom = document.getElementById("content_container");
var button = document.createElement("button");
var text = document.createTextNode("Sure you want to keep scrolling?");

button.style.border = "1px solid #dddfe2";
button.style.borderRadius = "3px";
button.style.fontSize = "large";
button.style.padding = "12px";
button.style.width = "61%";

button.appendChild(text);

button.addEventListener("click", () => {
  showNextPage();
  paginateCount++;
  text.nodeValue =
    "Sure you want to keep scrolling? This is your " +
    ordinal_suffix_of(paginateCount) +
    " time.";
  setTimeout(function() {
    readNextPage();
    removeNextPage();
  }, 1000);
});
newsFeedDom.appendChild(button);

function removeNextPage() {
  debug("Remove Next Page", child, parent);
  if (!document.getElementsByClassName("mbl")[0]) {
    debug("Null to remove");
    return;
  }
  document
    .getElementsByClassName("mbl")[0]
    .parentNode.removeChild(document.getElementsByClassName("mbl")[0]);
}

function readNextPage() {
  debug("Read Next Page", child, parent);
  if (document.getElementsByClassName("mbl")[0] == undefined) {
    debug("Attempt to read next page FAILED");
    return;
  }
  child = document.getElementsByClassName("mbl")[0];
  parent = document.getElementsByClassName("mbl")[0].parentNode;
}

function showNextPage() {
  debug("Show Next Page", child, parent);
  if (child === undefined) {
    debug("No child");
    return;
  }

  if (parent === undefined) {
    debug("No parent");
    return;
  }

  parent.appendChild(child);
}
