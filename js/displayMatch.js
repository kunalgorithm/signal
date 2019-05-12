var currentURL = location.href;

if(currentURL.includes("watch")){
    console.log(currentURL + " is a video!");
        
    var d1 = document.getElementById('related');
    d1.insertAdjacentHTML('beforebegin', '<div id="agora" class="flex-container" style=\"width:' + d1.offsetWidth + 'px; height:102px;"></div>');
    
    var d2 = document.getElementById('agora');
    d2.insertAdjacentHTML('afterbegin', '<span id="pictureSpan">One</span> <span id="titleSpan">Two</span> <span id="pSpan>Three</span>');
    //document.getElementById('related').prepend("<div id=\"agora\">Your friend Jorge Fuentes also watched this video.</div>");
    
    var d3 = document.getElementById('pictureDiv');
    d3.insertAdjacentHTML('afterbegin', '<img src="' + chrome.runtime.getURL('img/jorge.png') + '" alt="Your Friend" height="60" width="60">');
    /*var mainDiv = document.createElement("div");
    mainDiv.id ="agoraDiv";
    d.innerHtml = html;
    t1.appendChild(d);*/
    
}