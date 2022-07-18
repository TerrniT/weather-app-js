// Select my elements

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".weather-icon");

// Data

const weather = {};
weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
const key = "1d77cb7bd321a3b974d663238a45e24d";

// Browser support geolocation?

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>";
}

// Set user position

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// Show error

function showError(error) {
  console.log("error");
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// Get weather for api provider

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

// Display weather to UI

function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;
  tempElement.innerHTML = `${weather.temperature.value}°<span></span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

// Click on the temperature element

tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.init == "celsius") {
    let fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.init = "fahrenheit";
  } else {
    weather.temperature.init = "celsius";
  }
});
