const toggle = document.getElementById("toggle");
const circle = document.querySelector(".circle");
const icon = circle.querySelector("i");

let isNight = false;

toggle.onclick = () => {
  isNight = !isNight;

  // MOVE SWITCH
  circle.style.left = isNight ? "145px" : "5px";

  // CHANGE ICON
  icon.className = isNight
    ? "fa-solid fa-moon"
    : "fa-solid fa-sun";

  icon.style.color = isNight ? "#555" : "#f5b400";

  // CHANGE THEME
  document.body.classList.toggle("dark", isNight);
};
