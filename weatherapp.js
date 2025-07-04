const apiKey = "cca215859578d0979cf493cf8ad9386f"; 

function submitWeather() {
  const city = document.getElementById("city").value.trim();
  const locationInput = document.getElementById("location").value.trim();
  const query = city || locationInput;

  if (!query) {
    alert("Please enter a city or location.");
    return;
  }

//   OpenWeatherMap API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    query
  )}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("API request failed");
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherUI({
        type: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        description: data.weather[0].description,
        temperature: `${data.main.temp}°C`,
      });
    })
    .catch((error) => {
      console.warn("API call failed. Showing hardcoded demo data.", error);
      updateWeatherUI({
        type: query,
        icon: "https://openweathermap.org/img/wn/01d.png",
        description: "Sunny (Demo)",
        temperature: "27°C",
      });
    });
}

function updateWeatherUI(weatherData) {
  const result = document.getElementById("weather-result");
  const weatherType = document.getElementById("weather-type");
  const icon = document.getElementById("weather-icon");
  const desc = document.getElementById("weather-description");
  const temp = document.getElementById("weather-temp");

  weatherType.textContent = `Weather in ${weatherData.type}`;
  icon.src = weatherData.icon;
  desc.textContent = weatherData.description;
  temp.textContent = `Temperature: ${weatherData.temperature}`;

  result.classList.remove("hidden");
}
