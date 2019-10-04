module.exports = { main };

function main(hide) {
  console.log("🏃‍♂ running youtube.js", hide);
  if (hide) {
    document.getElementById("contents").style.visibility = "hidden";
    document.getElementById("related").style.visibility = "hidden";
    document.getElementById("comments").style.visibility = "hidden";
  } else {
    document.getElementById("contents").style.visibility = "visible";
    document.getElementById("related").style.visibility = "visible";
    document.getElementById("comments").style.visibility = "visible";
  }
}
