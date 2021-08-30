let weather = [
  { name: "paris", temp: 49.7, humidity: 80 },
  { name: "tokyo", temp: 17.3, humidity: 50 },
  { name: "lisbon", temp: 30.2, humidity: 20 },
  { name: "san fransisco", temp: 20.9, humidity: 100 },
  { name: "moscow", temp: -5, humidity: 20 },
];

function yourCity(city) {
  let place = prompt("Enter a city");
  if (place.toLowerCase() === weather[0].name)
    alert(
      `It is ${weather[0].temp} degrees celsius in ${weather[0].name} and the humidity is ${weather[0].humidity}%`
    );
  if (place.toLowerCase() === weather[1].name)
    alert(
      `It is ${weather[1].temp} degrees celsius in ${weather[1].name} and the humidity is ${weather[1].humidity}%`
    );
  if (place.toLowerCase() === weather[2].name)
    alert(
      `It is ${weather[2].temp} degrees celsius in ${weather[2].name} and the humidity is ${weather[2].humidity}%`
    );
  if (place.toLowerCase() === weather[3].name)
    alert(
      `It is ${weather[3].temp} degrees celsius in ${weather[3].name} and the humidity is ${weather[3].humidity}%`
    );
  if (place.toLowerCase() === weather[4].name)
    alert(
      `It is ${weather[4].temp} degrees celsius in ${weather[4].name} and the humidity is ${weather[4].humidity}%`
    );
  else {
    alert(
      "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
    );
  }
}

yourCity();
