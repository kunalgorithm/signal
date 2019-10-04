module.exports = { main };

function main(hide) {
  console.log("🏃‍♂ running youtube.js", hide);

  document.getElementById("related").style.visibility = "hidden";
  document.getElementById("comments").style.visibility = "hidden";
  // document.getElementById("page-manager").style.visibility = "hidden";
  // document
  //   .getElementsByClassName("mbl")[0]
  //   .parentNode.removeChild(document.getElementsByClassName("mbl")[0]);
}
