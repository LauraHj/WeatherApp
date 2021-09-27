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

//Display weather info using geolocation

function getLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getUrl);
}

function getUrl(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c599162a0b8730dc4520eddc02755e60";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let apiUrlMoreInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let apiUrlAirQuality = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  function showTemp(response) {
    let todayBox = document.querySelector(".today");
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
    let location = document.querySelector("#location");
    let cityName = response.data.name;
    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeed = response.data.wind.speed;
    todayBox.style.visibility = "visible";
    temp.innerHTML = ` ${temperature}`;
    weatherDescription.innerHTML = `${description}`;
    tempMax.innerHTML = `Today's high: ${todaysMax}°C`;
    tempMin.innerHTML = `Today's low: ${todaysMin}°C`;
    humidity.innerHTML = `${humidityData}%`;
    currently.innerHTML = `CURRENTLY`;
    location.innerHTML = `in ${cityName}`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    parkElement.setAttribute("src", "park.svg");
    windSpeedElement.innerHTML = `${windSpeed}km/h`;
  }

  function showUv(response) {
    let uvInfo = document.querySelector("#uv-info");
    let uvDescribeElement = document.querySelector("#uv-info-describe");
    let uvMax = Math.round(response.data.daily[0].uvi);
    console.log(uvMax);
    let uvDescriptors = [
      "Low",
      "Low",
      "Moderate",
      "Moderate",
      "Moderate",
      "High",
      "High",
      "Very High",
      "Very High",
      "Very High",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
      "Extreme",
    ];
    let uvDescribe = uvDescriptors[uvMax];
    uvInfo.innerHTML = `${uvMax}`;
    uvDescribeElement.innerHTML = `(${uvDescribe})`;
  }
  function showAirQuality(response) {
    let airQualityInfo = document.querySelector("#air-qual-info");
    let airQuality = response.data.list[0].main.aqi - 1;
    let airQualValue = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    let airQual = airQualValue[airQuality];
    airQualityInfo.innerHTML = `${airQual}`;
  }
  function showChanceOfRain(response) {
    let chanceOfRainInfo = document.querySelector("#pop-value");
    let chanceOfRain = 100 * response.data.daily[0].pop;
    chanceOfRainInfo.innerHTML = `${chanceOfRain}%`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[day];
  }

  function showForecast(response) {
    let forecastBox1 = document.querySelector("#forecast-box1");
    let forecastBox2 = document.querySelector("#forecast-box2");
    let forecastBox3 = document.querySelector("#forecast-box3");
    let forecastBox4 = document.querySelector("#forecast-box4");
    let forecast0Element = document.querySelector("#tomorrow");
    let forecast1Element = document.querySelector("#forecast-1");
    let forecast2Element = document.querySelector("#forecast-2");
    let forecast3Element = document.querySelector("#forecast-3");
    let forecast0Value = document.querySelector("#tomorrow-temp");
    let forecast1Value = document.querySelector("#two-days");
    let forecast2Value = document.querySelector("#three-days");
    let forecast3Value = document.querySelector("#four-days");
    let iconElement0 = document.querySelector("#forecast-icon-0");
    let iconElement1 = document.querySelector("#forecast-icon-1");
    let iconElement2 = document.querySelector("#forecast-icon-2");
    let iconElement3 = document.querySelector("#forecast-icon-3");
    let forecastIcon0 = response.data.daily[1].weather[0].icon;
    let forecastIcon1 = response.data.daily[2].weather[0].icon;
    let forecastIcon2 = response.data.daily[3].weather[0].icon;
    let forecastIcon3 = response.data.daily[4].weather[0].icon;

    forecastBox1.style.visibility = "visible";
    forecastBox2.style.visibility = "visible";
    forecastBox3.style.visibility = "visible";
    forecastBox4.style.visibility = "visible";
    forecast0Element.innerHTML = `TOMORROW`;
    forecast1Element.innerHTML = `${formatDay(response.data.daily[2].dt)}`;
    forecast2Element.innerHTML = `${formatDay(response.data.daily[3].dt)}`;
    forecast3Element.innerHTML = `${formatDay(response.data.daily[4].dt)}`;

    forecast0Value.innerHTML = `${Math.round(
      response.data.daily[1].temp.max
    )}°C / ${Math.round(response.data.daily[1].temp.min)}°C`;
    forecast1Value.innerHTML = `${Math.round(
      response.data.daily[2].temp.max
    )}°C / ${Math.round(response.data.daily[2].temp.min)}°C`;
    forecast2Value.innerHTML = `${Math.round(
      response.data.daily[3].temp.max
    )}°C / ${Math.round(response.data.daily[3].temp.min)}°C`;
    forecast3Value.innerHTML = `${Math.round(
      response.data.daily[4].temp.max
    )}°C / ${Math.round(response.data.daily[4].temp.min)}°C`;
    iconElement0.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecastIcon0}@2x.png`
    );
    iconElement1.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecastIcon1}@2x.png`
    );
    iconElement2.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecastIcon2}@2x.png`
    );
    iconElement3.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecastIcon3}@2x.png`
    );
  }

  axios.get(apiUrl).then(showTemp);
  axios.get(apiUrlMoreInfo).then(showUv);
  axios.get(apiUrlAirQuality).then(showAirQuality);
  axios.get(apiUrlMoreInfo).then(showChanceOfRain);
  axios.get(apiUrlMoreInfo).then(showForecast);
}

let useLocationButton = document.querySelector("#use-location");
useLocationButton.addEventListener("click", getLocation);

//Display weather info using search input
function showTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input");
  let apiKey = "c599162a0b8730dc4520eddc02755e60";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[day];
  }

  function showTempFromCity(response) {
    let todayBox = document.querySelector(".today");
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
    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeed = response.data.wind.speed;
    todayBox.style.visibility = "visible";
    temp.innerHTML = `${temperature}`;
    weatherDescription.innerHTML = `${description}`;
    tempMax.innerHTML = `Today's high: ${todaysMax}°C`;
    tempMin.innerHTML = `Today's low: ${todaysMin}°C`;
    humidity.innerHTML = `${humidityData}%`;
    currently.innerHTML = `CURRENTLY`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    parkElement.setAttribute("src", "park.svg");
    windSpeedElement.innerHTML = `${windSpeed}km/h`;
  }

  function findCoords(response) {
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let apiUrlMoreInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let apiUrlAirQuality = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    function showUvFromCity(response) {
      let uvInfo = document.querySelector("#uv-info");
      let uvDescribeElement = document.querySelector("#uv-info-describe");
      let uvDescriptors = [
        "Low",
        "Low",
        "Moderate",
        "Moderate",
        "Moderate",
        "High",
        "High",
        "Very High",
        "Very High",
        "Very High",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
        "Extreme",
      ];
      let uvMax = Math.round(response.data.current.uvi);
      let uvDescribe = uvDescriptors[uvMax];
      uvInfo.innerHTML = `${uvMax}`;
      uvDescribeElement.innerHTML = `(${uvDescribe})`;
    }

    function showAirQualFromCity(response) {
      let airQualityInfo = document.querySelector("#air-qual-info");
      let airQuality = response.data.list[0].main.aqi - 1;
      let airQualValue = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
      let airQual = airQualValue[airQuality];
      airQualityInfo.innerHTML = `${airQual}`;
    }

    function showChanceOfRainFromCity(response) {
      let chanceOfRainInfo = document.querySelector("#pop-value");
      let chanceOfRain = 100 * response.data.daily[0].pop;
      chanceOfRainInfo.innerHTML = `${chanceOfRain}%`;
    }
    function showForecast(response) {
      let forecastBox1 = document.querySelector("#forecast-box1");
      let forecastBox2 = document.querySelector("#forecast-box2");
      let forecastBox3 = document.querySelector("#forecast-box3");
      let forecastBox4 = document.querySelector("#forecast-box4");
      let forecast0Element = document.querySelector("#tomorrow");
      let forecast1Element = document.querySelector("#forecast-1");
      let forecast2Element = document.querySelector("#forecast-2");
      let forecast3Element = document.querySelector("#forecast-3");
      let forecast0Value = document.querySelector("#tomorrow-temp");
      let forecast1Value = document.querySelector("#two-days");
      let forecast2Value = document.querySelector("#three-days");
      let forecast3Value = document.querySelector("#four-days");
      let iconElement0 = document.querySelector("#forecast-icon-0");
      let iconElement1 = document.querySelector("#forecast-icon-1");
      let iconElement2 = document.querySelector("#forecast-icon-2");
      let iconElement3 = document.querySelector("#forecast-icon-3");
      let forecastIcon0 = response.data.daily[1].weather[0].icon;
      let forecastIcon1 = response.data.daily[2].weather[0].icon;
      let forecastIcon2 = response.data.daily[3].weather[0].icon;
      let forecastIcon3 = response.data.daily[4].weather[0].icon;

      forecastBox1.style.visibility = "visible";
      forecastBox2.style.visibility = "visible";
      forecastBox3.style.visibility = "visible";
      forecastBox4.style.visibility = "visible";
      forecast0Element.innerHTML = `TOMORROW`;
      forecast1Element.innerHTML = `${formatDay(response.data.daily[2].dt)}`;
      forecast2Element.innerHTML = `${formatDay(response.data.daily[3].dt)}`;
      forecast3Element.innerHTML = `${formatDay(response.data.daily[4].dt)}`;

      forecast0Value.innerHTML = `${Math.round(
        response.data.daily[1].temp.max
      )}°C / ${Math.round(response.data.daily[1].temp.min)}°C`;
      forecast1Value.innerHTML = `${Math.round(
        response.data.daily[2].temp.max
      )}°C / ${Math.round(response.data.daily[2].temp.min)}°C`;
      forecast2Value.innerHTML = `${Math.round(
        response.data.daily[3].temp.max
      )}°C / ${Math.round(response.data.daily[3].temp.min)}°C`;
      forecast3Value.innerHTML = `${Math.round(
        response.data.daily[4].temp.max
      )}°C / ${Math.round(response.data.daily[4].temp.min)}°C`;
      iconElement0.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${forecastIcon0}@2x.png`
      );
      iconElement1.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${forecastIcon1}@2x.png`
      );
      iconElement2.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${forecastIcon2}@2x.png`
      );
      iconElement3.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${forecastIcon3}@2x.png`
      );
    }

    axios.get(apiUrlMoreInfo).then(showForecast);
    axios.get(apiUrlMoreInfo).then(showUvFromCity);
    axios.get(apiUrlMoreInfo).then(showChanceOfRainFromCity);
    axios.get(apiUrlAirQuality).then(showAirQualFromCity);
  }

  axios.get(apiUrlCity).then(showTempFromCity);
  axios.get(apiUrlCity).then(findCoords);
}
let input = document.querySelector("#location-form");
input.addEventListener("submit", showTemp);
