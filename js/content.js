reloadContentScript()

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "urlChanged") {
      reloadContentScript()
    }
  });

//   let friendHTML = template ({
//       imgsrc: friend.picUrl,
//       name: friend.name,
//       time: friend.timestamp
//   });
//   console.log(friendHTML);
//   return friendHTML;
// }

const currentURL = location.href;
console.log("Establishing Signal");

function reloadContentScript(){
    console.log("Hello, I am being caallled my boy")
    const currentURL = location.href;
    console.log("Establishing Signal");
    
    if(currentURL.includes("facebook.com")) {
        require("./facebook/facebook.js").facebook();
    } else {
        require("./test.js");
    }
}