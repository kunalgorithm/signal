var currentURL = location.href;

const Http = new XMLHttpRequest();
const url=chrome.runtime.getURL('http://127.0.0.1:3000/getFriendVisits');
console.log(url);
Http.open("GET", url);
Http.send();
Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
}


if(currentURL.includes("watch")){
    console.log(currentURL + " is a video!");
        
    var d1 = document.getElementById('related');
    d1.insertAdjacentHTML('beforebegin', '<div id="agora" class="flex-container" style=\"width:' + d1.offsetWidth + 'px; height:102px;"></div>');
    
    var d2 = document.getElementById('agora');
    d2.insertAdjacentHTML('afterbegin', '<span id="pictureSpan"></span> <span id="titleSpan" style="font-size: 12px">' + Http.responseText["name"] + '</span> <span id="pSpan">viewed this video 12 minutes ago.</span>');
    //document.getElementById('related').prepend("<div id=\"agora\">Your friend Jorge Fuentes also watched this video.</div>");
    
    var d3 = document.getElementById('pictureSpan');
    d3.insertAdjacentHTML('afterbegin', '<img src="' + Http.responseText["picUrl"] + '" alt="Your Friend" style="margin: 10px 15px" height="60" width="60">');
    /*var mainDiv = document.createElement("div");
    mainDiv.id ="agoraDiv";
    d.innerHtml = html;
    t1.appendChild(d);*/
    
}


/*

when did they last view it?
what if multiple people view it?

*/