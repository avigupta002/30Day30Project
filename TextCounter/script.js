
// Here created a  two functions
// first function is limited word typing that is max word is 200
// seconde function is unlimited word typing

const textarea = document.getElementById("text");
const chars = document.getElementById("chars");
const words = document.getElementById("words");
// const count = document.getElementById("count");
// const progressBar = document.getElementById("progress-bar");
// const warning = document.getElementById("warning");

// const MAX = 200;
// document.getElementById("max").innerText = MAX;

textarea.addEventListener("input", () => {
  let value = textarea.value;

  /* Unlimited counters */
  chars.innerText = value.length;
  const wordCount = value.trim() === ""
    ? 0
    : value.trim().split(/\s+/).length;
  words.innerText = wordCount;

  /* Limited counter */
//   if(value.length > MAX){
//     textarea.value = value.substring(0, MAX);
//     value = textarea.value;
//   }

  count.innerText = value.length;

//   const percent = (value.length / MAX) * 100;
//   progressBar.style.width = percent + "%";

//   warning.style.display = value.length === MAX ? "block" : "none";
});
