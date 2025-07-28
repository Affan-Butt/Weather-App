// Weather API Key
const apiKey = '7e9a72d936be474d86f111912252807';

// Function to fetch weather data
function fetchWeatherData(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Check if the response contains valid weather data
      if (data.error) {
        alert('City not found. Please try again.');
        return;
      }

      // Update UI with weather data
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      alert('An error occurred. Please try again later.');
    });
}

// Function to display weather data
function displayWeatherData(data) {
  const cityName = document.getElementById('cityName');
  const condition = document.getElementById('condition');
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('windSpeed');
  const weatherIcon = document.getElementById('weatherIcon');

  // Get the weather data from the API response
  cityName.textContent = `${data.location.name}, ${data.location.country}`;
  condition.textContent = data.current.condition.text;
  temperature.textContent = `${data.current.temp_c}°C`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  windSpeed.textContent = `Wind: ${data.current.wind_kph} km/h`;
  weatherIcon.src = data.current.condition.icon;

  // Display the weather info card
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.classList.add('show');
}

// Event listener for the search button
document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const location = document.getElementById('location').value.trim();
  if (location) {
    fetchWeatherData(location);
  } else {
    alert('Please enter a valid city name.');
  }
});

// Optionally, handle Enter key press for quick search
document.getElementById('location').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('getWeatherBtn').click();
  }
});
