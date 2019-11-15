module.exports = { main };

import { hideQuerySelector, showAll } from "../utils.js";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:youtube");

function main(hide) {
  debug("🏃‍♂ running youtube.js", hide);
  if (hide) {
    hideQuerySelector("#contents");
    hideQuerySelector("#related");
    hideQuerySelector("#comments");
  } else {
    showAll();
  }
}
