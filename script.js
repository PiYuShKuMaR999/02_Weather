document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperratureDisplay = document.getElementById("temperature");
  const windSpeedDisplay = document.getElementById("wind_speed");
  const feelsLikeDisplay = document.getElementById("feels_like");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "182b8a9f7f4c5c84b1e5b8af6cba0ddb"; //env variable

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //it may throw an error
    //server/database ia always located in another country
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
    
    if(!response.ok){
      throw new Error("CITY NOT FOUND")
    }
    const data = await response.json()
    return data

  }
  function displayWeatherData(data) {
    //displays the weather
    console.log(data);
    const {name, main, weather, wind} =data
    //here main is an object and weather is an aaray and wind is
    cityNameDisplay.textContent = name;
    temperratureDisplay.textContent = `Temperature :${main.temp} deg`;
    feelsLikeDisplay.textContent = `Feels like :${main.feels_like} deg`;
    const windSpeedKmph = (wind.speed * 3.6).toFixed(2);
    windSpeedDisplay.textContent = `Wind Speed: ${windSpeedKmph} km/h`;
    descriptionDisplay.textContent = `Weather :${weather[0].description}`;

    //unlocking the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

  }
function showError() {
  weatherInfo.classList.add("hidden");    // Hide weather info
  errorMessage.classList.remove("hidden"); // Show error message
}
});
