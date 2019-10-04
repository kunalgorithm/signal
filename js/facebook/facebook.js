module.exports = { main };

console.log("🤦‍ running facebook script");

let child 
let parent
let counter

function main(hide) {
  if (counter === undefined) counter = 0 
  else counter++

  if (counter == 0) {
    console.log("Screw the first time")
    return
  }
  readNextPage()
  removeNextPage()

  let chatBar = document.getElementsByClassName('fbDock')[0]
  let leftBar = document.getElementById("left_nav_section_nodes")
  let newsFeed = document.querySelectorAll('[role="region"]')
  console.log("NF", newsFeed)

  if (hide) {
    chatBar.style.visibility = "hidden"
    leftBar.style.visibility = "hidden"

    if (newsFeed.length == 2) { 
      newsFeed[1].style.visibility = "hidden"
    }

  } else {
    chatBar.style.visibility = "visible"
    leftBar.style.visibility = "visible"
    
    if (newsFeed.length == 2) { 
      newsFeed[1].style.visibility = "visible"
    }
  }

}

let newsFeedDom = document.getElementById("content_container");
  var button = document.createElement("button");
  var text = document.createTextNode("Sure you want to keep scrolling?")

  button.style.border = "1px solid #dddfe2"
  button.style.borderRadius = "3px"
  button.style.fontSize = "large"
  button.style.padding = "12px"
  button.style.width = "61%"

  button.appendChild(text)

  button.addEventListener("click",  () => {
    showNextPage()
    setTimeout( function () {
      readNextPage()
      removeNextPage()
    }, 1000)
  })
  newsFeedDom.appendChild(button);

function removeNextPage() {
  console.log("Remove Next Page", child, parent)
  if (!document.getElementsByClassName("mbl")[0]) {
    console.log("Null to remove")
    return
  }
  document.getElementsByClassName("mbl")[0].parentNode.removeChild(document.getElementsByClassName("mbl")[0]);
}

function readNextPage() {
  console.log("Read Next Page", child, parent)
  if (document.getElementsByClassName("mbl")[0] == undefined) {
    console.log("Attempt to read next page FAILED")
    return
  }
  child = document.getElementsByClassName("mbl")[0]
  parent = document.getElementsByClassName("mbl")[0].parentNode
}

function showNextPage() {
  console.log("Show Next Page", child, parent)
  if (child === undefined) {
    console.log("No child")
    return
  }

  if (parent === undefined) {
    console.log("No parent")
    return
  }

  parent.appendChild(child)
}