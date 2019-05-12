const Handlebars = require('handlebars');

var imported = document.createElement('script');
imported.src = 'handlebars.js';
document.head.appendChild(imported);

var currentURL = location.href;

chrome.runtime.sendMessage({type: "gid"}, (response) => {
  let url = "http://localhost:3001/logVisit?gid=" + response.id + "&url=" + currentURL;
  console.log("LOG URL", url);
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
      }

      // Examine the text in the response
      response.json().then((data) => {
        console.log("Visit Response", data);
      });
    });
});

chrome.runtime.sendMessage({type: "gid"}, function(response) {
  console.log("GID", response.id);
  let url = "http://localhost:3001/getFriendVisits?gid=" + response.id + "&url=" + currentURL;
  console.log("Friend URL", url);
  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
      }

      // Examine the text in the response
      response.json().then(function(friendList) {
        console.log("FL", friendList);
        loadAgora(friendList);
      });
    });
});

function loadAgora(friendList) {
  if(currentURL.includes("watch")) {
    console.log(currentURL + " is a video!");

    let agora = document.getElementById('agora');
    if (!agora) {
      console.log("Agora Creation");
        var d1 = document.getElementById('related');
        d1.insertAdjacentHTML('beforebegin', ''+
        '<div id="agora" class="flex-container" style=\"width:' + d1.offsetWidth + 'px; height:102px;">' + 
        '</div>'
        );  

        agora = document.getElementById('agora')
        agora.insertAdjacentHTML('afterbegin', ''+
        '<span id="handleInfo" style="vertical-align:middle">'+
        '</span>'
        );
        
        for(let i = 0; i < friendList.length; i++) {
          let friend = friendList[i];
          console.log("Friend" + i, friendList[i]);
          document.getElementById("handleInfo").innerHTML += generateFriendHTML(friend);
        }
    }
    else {
      console.log("Agora already exists");
      // document.getElementById("handleInfo").innerHTML = '';
      // for(let i = 0; i < friendList.length; i++) {
      //   let friend = friendList[i];
      //   console.log("Friend" + i, friendList[i]);
      //   document.getElementById("handleInfo").innerHTML += generateFriendHTML(friend);
      // }
    }
  }
}

function generateFriendHTML(friend) {
  let handleInfo =
  '<img src=" {{imgsrc}} " alt="Your Friend" class="ballpic" height="60" width="60">' +
  '<span id="titleSpan" style="font-size: 12px"> {{name}} </span>';
   // + '<span id="pSpan">viewed this video {{time}} ago.</span>';

  let template = Handlebars.compile(handleInfo);

  let friendHTML = template ({
      imgsrc: friend.picUrl,
      name: friend.name,
      time: friend.timestamp
  });
  // console.log(friendHTML);
  return friendHTML
}



/*

when did they last view it?
what if multiple people view it?

*/

