/*
  This is mapping from the url(new URL(location.href).hostname) to the corresponding script ft. 
  Requires can't be dynamic script names(i.e "sites" + currentDomain), but requiring all of them
  runs all of them, by putting them in a function it will only include it if you want it to be included :o
*/

//TODO: Define a options function for each file that can then be used to populate options page, change shouldHide to options dict
const siteConfig = {
  "www.youtube.com": () => require("../content/sites/youtube.js"),
  "www.facebook.com": () => require("../content/sites/facebook.js"),
  "www.linkedin.com": () => require("../content/sites/linkedin.js"),
  "www.reddit.com": () => require("../content/sites/reddit.js"),
  "www.twitter.com": () => require("../content/sites/twitter.js")
};

export default siteConfig;
