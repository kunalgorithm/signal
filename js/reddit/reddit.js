module.exports = { main }

console.log("runnning reddit script")

function main(redirect) {
    if (redirect) {
        if (test(window.location.href)) {
            window.location.assign(getNewPagePlease(window.location.href));
        }
        fixRedditStuff()
    }
}

function test(url){
    return !!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/.*|$)/gim);
}

function getNewPagePlease(url){
    return 'https://old.reddit.com' + url.split('reddit.com').pop();
}

function fixRedditStuff(){
    var links = Array.prototype.slice.call(document.links, 0);
    links.filter(function(link){
        if(test(link.href)){
            var greatNewLink = getNewPagePlease(link.href);
            if(link.hasAttribute('data-outbound-url')) link.setAttribute('data-outbound-url', greatNewLink);
            link.setAttribute('href', greatNewLink);
        }
    });
}