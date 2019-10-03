module.exports = { main };

function main(hide) {
  console.log("🤦‍ running facebook script");
  document.getElementById("left_nav_section_nodes").style.visibility = "hidden";
  document
    .getElementsByClassName("mbl")[0]
    .parentNode.removeChild(document.getElementsByClassName("mbl")[0]);
}
