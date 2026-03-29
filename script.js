

const inputBox = document.querySelector(`.city-input`);
const searchbtn = document.querySelector(`.search-btn`);
const city_name = document.getElementById(`city-name`);
const description = document.getElementById(`description`);
const weather_img = document.getElementById(`weather-icon`);
const temperature = document.getElementById(`temperature`);
const humidity = document.getElementById(`humidity`);
const wind = document.getElementById(`wind`);
const pressure = document.getElementById(`pressure`);
const feels_like = document.getElementById(`feels-like`);

const homeview = document.querySelector(`.home-view`);
const dashboardview = document.querySelector(`.dashboard-view`);
const errorview = document.querySelector(`.error-view`);

const API = "4f431a6c46b142ccd52cc18699b137af";

//? Search Button Click//
searchbtn.addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (!city) return;
  checkWeather(city);
  // inputBox.value = "";
});

inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const city = inputBox.value.trim();
    if (!city) return;
    checkWeather(city);
    inputBox.value = "";
  }
});

// Main Weather Function
async function checkWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      showError();
      return;
    }

    updateUI(data);
    showDashboard();
  } catch (error) {
    console.log(error);
    showError();
  }
}

function updateUI(data) {
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  city_name.textContent = data.name;
  description.textContent = data.weather[0].description;
  wind.textContent = `${data.wind.speed} km/h`;
  humidity.textContent = `${data.main.humidity} %`;
  pressure.textContent = `${data.main.pressure} hPa`;
  feels_like.textContent = `${Math.round(data.main.feels_like)} °C`;

  switch (data.weather[0].main) {
    case `Clouds`:
      weather_img.src = "assets/images/cloud.png";
      break;

    case `Clear`:
      weather_img.src = "assets/images/weather-icon.webp";
      break;

    case `Rain`:
      weather_img.src = "assets/images/rainy-day.png";
      break;

    case `Mist`:
      weather_img.src = "assets/images/fog.png";
      break;

    case `Haze`:
      weather_img.src = "assets/images/haze.png";
      break;

    case `Snow`:
      weather_img.src = "assets/images/snow.png";
      break;

    case `Thunderstorm`:
      weather_img.src = "assets/images/thunder.png";
      break;

    case `Smoke`:
      weather_img.src = "assets/images/smoke.png";
      break;

    case `Drizzle`:
      weather_img.src = "assets/images/drizzle.png";
      break;

    default:
      weather_img.src = "assets/images/commonlogo.png";
      break;
  }
}

function showDashboard() {
  homeview.classList.add("hidden");
  errorview.classList.add("hidden");
  dashboardview.classList.remove("hidden");
}

function showError() {
  homeview.classList.add("hidden");
  dashboardview.classList.add("hidden");
  errorview.classList.remove("hidden");
}
