// const { youtube } = require("./youtube/youtube");
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
console.log("CONTENT SCRIPT HELLO", currentURL);

if (currentURL.includes("facebook")) {
  console.log("hiding facebook navbar .");
  document.getElementById("left_nav_section_nodes").style.visibility = "hidden";

  // youtube();
}
