//Changing date and time
let now = new Date();
let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

let weekday = document.querySelector("#weekday");
weekday.innerHTML = days[now.getDay()].toUpperCase();

let time = document.querySelector("#time");
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${now.getHours()}:${minutes}`;

//Changing location name from form submission
function changeLocation(event) {
  event.preventDefault();
  let locationSubmission = document.querySelector("#location-input");

  let location = document.querySelector("#location");
  if (locationSubmission.value) {
    location.innerHTML = `in ${locationSubmission.value[0].toUpperCase()}${locationSubmission.value
      .substr(1, 30)
      .toLowerCase()}`;
  } else {
    location.innerHTML = null;
  }
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", changeLocation);

// //Celsius
// let tempsC = ["21°C/34°C", "15°C/28°C", "17°C/30°C", "21°C/33°C"];

// function celsius(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#temp");
//   let tomorrow = document.querySelector("#tomorrow-temp");
//   let dayTwo = document.querySelector("#two-days");
//   let dayThree = document.querySelector("#three-days");
//   let dayFour = document.querySelector("#four-days");

//   temp.innerHTML = `19°C`;
//   tomorrow.innerHTML = tempsC[0];
//   dayTwo.innerHTML = tempsC[1];
//   dayThree.innerHTML = tempsC[2];
//   dayFour.innerHTML = tempsC[3];
// }
// let celsiusButton = document.querySelector("#celsius");
// celsiusButton.addEventListener("click", celsius);

// //fahrenheit
// let tempsF = ["59°F/90°F", "57°F/94°F", "50°F/85°F", "59°F/89°F"];

// function fahrenheit(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#temp");
//   let tomorrow = document.querySelector("#tomorrow-temp");
//   let dayTwo = document.querySelector("#two-days");
//   let dayThree = document.querySelector("#three-days");
//   let dayFour = document.querySelector("#four-days");

//   temp.innerHTML = `76°F`;
//   tomorrow.innerHTML = tempsF[0];
//   dayTwo.innerHTML = tempsF[1];
//   dayThree.innerHTML = tempsF[2];
//   dayFour.innerHTML = tempsF[3];
// }
// let fahrenheitButton = document.querySelector("#fahrenheit");
// fahrenheitButton.addEventListener("click", fahrenheit);

//Display temperature using geolocation
function getLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getUrl);
}

function getUrl(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c599162a0b8730dc4520eddc02755e60";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  reverseGeocodeApiKey = "a36f3f6069d4b31bb2a19b59ee676056";
  reverseGeocodeApiUrl = `http://api.positionstack.com/v1/reverse?access_key=${reverseGeocodeApiKey}&query=${lat},${lon}`;
  let apiUrlUv = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  let apiUrlAirQuality = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  function showTemp(response) {
    let temperature = Math.round(response.data.main.temp) + "°C";
    let temp = document.querySelector("#temp");
    let weatherDescription = document.querySelector("#weather-description");
    let description = response.data.weather[0].description;
    let tempMax = document.querySelector("#temp-max");
    let todaysMax = Math.round(response.data.main.temp_max);
    let tempMin = document.querySelector("#temp-min");
    let todaysMin = Math.round(response.data.main.temp_min);
    let humidity = document.querySelector("#humidity");
    let humidityData = response.data.main.humidity;
    let currently = document.querySelector("#currently");
    let iconElement = document.querySelector("#icon");
    let icon = response.data.weather[0].icon;
    let parkElement = document.querySelector("#park-element");
    temp.innerHTML = ` ${temperature}`;
    weatherDescription.innerHTML = `${description}`;
    tempMax.innerHTML = `Today's high: ${todaysMax}°C`;
    tempMin.innerHTML = `Today's low: ${todaysMin}°C`;
    humidity.innerHTML = `Humidity: ${humidityData}%`;
    currently.innerHTML = `CURRENTLY`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    parkElement.setAttribute("src", "park.svg");
  }
  function reverseGeocode(response) {
    let location = document.querySelector("#location");
    let cityName = response.data.data[0].locality;
    location.innerHTML = `in ${cityName}`;
  }
  function showUv(response) {
    let uvInfo = document.querySelector("#uv-info");
    let uvMax = Math.round(response.data.daily[0].uvi);
    uvInfo.innerHTML = `Maximum UV index: ${uvMax}`;
  }
  function showAirQuality(response) {
    let airQualityInfo = document.querySelector("#air-qual-info");
    let airQuality = response.data.list[0].main.aqi - 1;
    let airQualValue = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    let airQual = airQualValue[airQuality];
    airQualityInfo.innerHTML = `${airQual}`;
  }

  axios.get(apiUrl).then(showTemp);
  axios.get(reverseGeocodeApiUrl).then(reverseGeocode);
  axios.get(apiUrlUv).then(showUv);
  axios.get(apiUrlAirQuality).then(showAirQuality);
}

let useLocationButton = document.querySelector("#use-location");
useLocationButton.addEventListener("click", getLocation);

//Display temp using search input
function showTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input");
  let apiKey = "c599162a0b8730dc4520eddc02755e60";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  let geocodeApiKey = "a36f3f6069d4b31bb2a19b59ee676056";
  let geocodeURL = `http://api.positionstack.com/v1/forward?access_key=${geocodeApiKey}&query=${city.value}`;

  function showTempFromCity(response) {
    let temperature = Math.round(response.data.main.temp) + "°C";
    let temp = document.querySelector("#temp");
    let weatherDescription = document.querySelector("#weather-description");
    let description = response.data.weather[0].description;
    let tempMax = document.querySelector("#temp-max");
    let todaysMax = Math.round(response.data.main.temp_max);
    let tempMin = document.querySelector("#temp-min");
    let todaysMin = Math.round(response.data.main.temp_min);
    let humidity = document.querySelector("#humidity");
    let humidityData = response.data.main.humidity;
    let currently = document.querySelector("#currently");
    let iconElement = document.querySelector("#icon");
    let icon = response.data.weather[0].icon;
    let parkElement = document.querySelector("#park-element");
    temp.innerHTML = `${temperature}`;
    weatherDescription.innerHTML = `${description}`;
    tempMax.innerHTML = `Today's high: ${todaysMax}°C`;
    tempMin.innerHTML = `Today's low: ${todaysMin}°C`;
    humidity.innerHTML = `Humidity: ${humidityData}%`;
    currently.innerHTML = `CURRENTLY`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    parkElement.setAttribute("src", "park.svg");
  }

  function findCoords(response) {
    let lat = response.data.data[0].latitude;
    let lon = response.data.data[0].longitude;
    let apiKey = "c599162a0b8730dc4520eddc02755e60";
    let apiUrlUv = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let apiUrlAirQuality = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    function showUvFromCity(response) {
      let uvInfo = document.querySelector("#uv-info");
      let uvMax = Math.round(response.data.daily[0].uvi);
      uvInfo.innerHTML = `Maximum UV index: ${uvMax}`;
    }

    function showAirQualFromCity(response) {
      let airQualityInfo = document.querySelector("#air-qual-info");
      let airQuality = response.data.list[0].main.aqi - 1;
      let airQualValue = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
      let airQual = airQualValue[airQuality];
      airQualityInfo.innerHTML = `${airQual}`;
    }

    axios.get(apiUrlUv).then(showUvFromCity);
    axios.get(apiUrlAirQuality).then(showAirQualFromCity);
  }

  axios.get(apiUrlCity).then(showTempFromCity);
  axios.get(geocodeURL).then(findCoords);
}
let input = document.querySelector("#location-form");
input.addEventListener("submit", showTemp);

//Fetch UV data

// function getUvIndex() {
//   let lat = 27.4705;
//   let lon = 153.026;
//   let apiKeyUv = "c599162a0b8730dc4520eddc02755e60";
//   let uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKeyUv}`;

//   function showUv(response) {
//     let uvInfo = document.querySelector("#uv-info");
//     let uvMax = Math.round(response.data.daily[0].uvi);
//     uvInfo.innerHTML = `Today's maximum UV index: ${uvMax}`;
//   }
//   axios.get(uvUrl).then(showUv);
// }

// let uvButton = document.querySelector("#uvIndexButton");
// uvButton.addEventListener("click", getUvIndex);
