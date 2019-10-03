console.log("Hi Im facebook");

setTimeout(function() {
    //your code to be executed after 1 second
    console.log("Attempting to run script")
    document.getElementsByClassName("mbl")[0].parentNode.removeChild(document.getElementsByClassName("mbl")[0]);
  }, 1000);

  // TODO: Meme or not meme