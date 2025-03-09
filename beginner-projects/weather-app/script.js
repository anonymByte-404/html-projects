const apiKey = "YOUR_API_KEY"  // Replace with your OpenWeatherMap API Key

async function getWeather() {
  const city = document.getElementById("city").value
  if (!city) {
    alert("Please enter a city name.")
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.cod === "404") {
      document.getElementById("weather-info").innerHTML = `<p>City not found.</p>`
      return;
    }

    document.getElementById("weather-info").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
        `
  } catch (error) {
    document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data.</p>`
  }
}
