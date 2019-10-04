const currentURL = location.href;
console.log("Establishing Signal");

if (currentURL.includes("facebook.com")) {
  const { facebook } = require("./facebook/facebook.js");
  facebook();
} else if (currentURL.includes("youtube")) {
  const { youtube } = require("./youtube/youtube.js");
  youtube();
} else {
  require("./test.js");
}
