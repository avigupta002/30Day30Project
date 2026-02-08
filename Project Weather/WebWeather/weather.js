const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");

const cityNameEl = document.querySelector(".city-name");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".desc");
const windEl = document.querySelector(".wind");
const humidityEl = document.querySelector(".humidity");
const iconEl = document.querySelector(".weather-icon");
const forecastEl = document.querySelector(".forecast");

const API_KEY = "5f84dbd32ed7410c1e8121686fcf513a"; 

const weatherMap = {
  Clear: { icon: "clear.png", bg: "clear-bg" },
  Clouds: { icon: "cloud.png", bg: "clouds-bg" },
  Rain: { icon: "rain.png", bg: "rain-bg" },
  Snow: { icon: "snow.png", bg: "snow-bg" },
  Mist: { icon: "mist.png", bg: "mist-bg" },
  Haze: { icon: "Storm.png", bg: "mist-bg" }
};

function setBackground(condition) {
  document.body.className = weatherMap[condition]?.bg || "default-bg";
}

function getIcon(condition) {
  return `assets/${weatherMap[condition]?.icon || "clear.png"}`;
}

function fetchWeather(lat, lon, city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const current = data.list[0];
      const condition = current.weather[0].main;

      cityNameEl.textContent = city;
      tempEl.textContent = `${(current.main.temp - 273.15).toFixed(1)}°C`;
      descEl.textContent = current.weather[0].description;
      windEl.textContent = current.wind.speed;
      humidityEl.textContent = current.main.humidity;
      iconEl.src = getIcon(condition);

      setBackground(condition);

      forecastEl.innerHTML = "";
      const days = [];

      data.list.forEach(item => {
        const day = new Date(item.dt_txt).getDate();
        if (!days.includes(day) && days.length < 5) {
          days.push(day);
          forecastEl.innerHTML += `
            <li class="card">
              <h4>${item.dt_txt.split(" ")[0]}</h4>
              <img src="${getIcon(item.weather[0].main)}">
              <p>${(item.main.temp - 273.15).toFixed(1)}°C</p>
              <p> ${item.main.humidity}%</p>
            </li>`;
        }
      });
    });
}

searchBtn.onclick = () => {
  const city = cityInput.value.trim();
  if (!city) return;

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const { lat, lon, name } = data[0];
      fetchWeather(lat, lon, name);
    });
};

locationBtn.onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => fetchWeather(latitude, longitude, data[0].name));
  });
};
