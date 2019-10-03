reloadContentScript()

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "urlChanged") {
      reloadContentScript()
    }
  });



function reloadContentScript(){
    console.log("Hello, I am being caallled my boy")
    const currentURL = location.href;
    console.log("Establishing Signal");
    
    if(currentURL.includes("facebook.com")) {
        require("./facebook/facebook.js");
    } else {
        require("./test.js");
    }
}
