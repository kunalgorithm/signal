const Handlebars = require('handlebars');

var imported = document.createElement('script');
imported.src = 'handlebars.js';
document.head.appendChild(imported);


var currentURL = location.href;

if(currentURL.includes("watch")){
    console.log(currentURL + " is a video!");

    var agora = document.getElementById('agora');
    console.log(agora)
    if (!agora){
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

        var handleInfo = 
        '<img src=" {{imgsrc}} " alt="Your Friend" class="ballpic" height="60" width="60">' +
        '<span id="titleSpan" style="font-size: 12px"> {{name}} </span>' +
        '<span id="pSpan">viewed this video {{time}} ago.</span>';

        var template = Handlebars.compile(handleInfo);

        var handleData = template ({
            imgsrc: chrome.runtime.getURL('img/jorge.png'),
            name: "Jorge S. Fuentes",
            time: "12 minutes"
        });

        document.getElementById("handleInfo").innerHTML += handleData;

        /*var mainDiv = document.createElement("div");
    mainDiv.id ="agoraDiv";
    d.innerHtml = html;
    t1.appendChild(d);*/
    }
    else{

    }
}



/*

when did they last view it?
what if multiple people view it?

*/

