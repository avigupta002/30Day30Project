
const tick = document.getElementById("tick");

function updateClock(){
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;

  h = h < 10 ? "0"+h : h;
  m = m < 10 ? "0"+m : m;
  s = s < 10 ? "0"+s : s;

  setFlip("h", h);
  setFlip("m", m);
  setFlip("s", s);

  document.getElementById("ampm").innerText = ampm;
  tick.currentTime = 0;
  tick.play();
}

function setFlip(id, value){
  const el = document.getElementById(id);
  if(el.innerText !== value){
    el.innerText = value;
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "flip .6s ease";
  }
}

/* THEMES */
function theme(type){
  if(type === "dark"){
    document.documentElement.style.setProperty('--bg','#000');
    document.documentElement.style.setProperty('--card','#111');
    document.documentElement.style.setProperty('--text','#fff');
  }
  if(type === "blue"){
    document.documentElement.style.setProperty('--bg','#020b1c');
    document.documentElement.style.setProperty('--card','#0a1f44');
    document.documentElement.style.setProperty('--text','#4fc3ff');
  }
  if(type === "green"){
    document.documentElement.style.setProperty('--bg','#001a10');
    document.documentElement.style.setProperty('--card','#003d2a');
    document.documentElement.style.setProperty('--text','#4cffb0');
  }
}

updateClock();
setInterval(updateClock,1000);
