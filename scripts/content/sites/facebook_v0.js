module.exports = { main };

import { hideQuerySelector, showAll } from "../utils.js";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:youtube");

function main(hide) {
  debug("🏃‍♂ running facebook_v0.js", hide);
  if (hide) {
    hideQuerySelector("#fb_stories_card_root");
    hideQuerySelector("[role='feed']");
    hideQuerySelector(".home_right_column");
    hideQuerySelector("#pagelet_rhc_footer");
  } else {
    showAll();
  }
}
