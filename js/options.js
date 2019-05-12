chrome.runtime.sendMessage({type: "gid"}, function(response) {
  console.log(response);
  let url = "https://www.facebook.com/v3.3/dialog/oauth?" +
  "client_id=824720791232936&" +
  "redirect_uri=http://localhost:3001/fblogin&" + 
  "scope=user_friends&" +
  "state=" + response.id;
  
  console.log(url);
  let main = document.getElementById('main');
  main.innerHTML = "<a href='" + url + "'> Click me </a>";
});
