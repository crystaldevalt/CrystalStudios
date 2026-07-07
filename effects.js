// effects.js
alert("Script is loading!"); // This will pop up a box on your phone if it works

const element = document.getElementById("typewriter-text");
if (element) {
    element.textContent = "Test worked!";
} else {
    alert("Element not found!");
}
