//THIS IS A WAY TO INJECT SCRIPTS DONT RECOMMEND SORRY
// var imported = document.createElement('script');
// imported.src = 'handlebars.js';
// document.head.appendChild(imported);

// function generateFriendHTML(friend) {
//   let handleInfo =
//   '<div class="card">' + 
//     '<img src=" {{imgsrc}} " alt="Your Friend" class="ballpic" height="60" width="60">' +
//     '<span id="titleSpan"> {{name}} </span>' + 
//   '</div>';
//    // + '<span id="pSpan">viewed this video {{time}} ago.</span>';

//   let template = Handlebars.compile(handleInfo);

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

if(currentURL.includes("facebook.com")) {
    require("./facebook/facebook.js");
} else {
    require("./test.js");
}