const tomorrowApiKey = "1V5saa9Sq7J3SgAzEtFWFM3wKIUZE1iE"; // Replace with your Tomorrow.io API key
const geocodingApiKey = "1oveK4jhFdNkckR94fM29w==6egVmx8EG25PDp4U"; // Replace with your Geocoding API key
const timezoneApiKey = '1oveK4jhFdNkckR94fM29w==6egVmx8EG25PDp4U'; // Replace 'YOUR_API_KEY' with your actual API key
// Function to fetch weather data using Tomorrow.io API
async function fetchWeatherData(city) {
    try {
        // Get coordinates from Geocoding API
        const { latitude, longitude } = await getCoordinates(city);
        
        // Get timezone from Timezone API
        const timezone = await getTimezone(latitude, longitude);

        // Fetch weather data using Tomorrow.io API
        const weatherData = await getWeatherFromTomorrow(latitude, longitude, timezone);

        // Display weather data on the webpage
        displayWeather(weatherData);
    } catch (error) {
        // Handle errors
        displayError(error.message);
    }
}


async function getCoordinates(city) {
    const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': geocodingApiKey,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch coordinates.');
        }
        const data = await response.json();
        if (data.length === 0) {
            throw new Error('City not found.');
        }
        // Assuming the first result is the desired location
        return { latitude: data[0].latitude, longitude: data[0].longitude };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getTimezone(latitude, longitude) {
    const apiUrl = `https://api.api-ninjas.com/v1/timezone?lat=${latitude}&lon=${longitude}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': timezoneApiKey,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch timezone.');
        }
        const data = await response.json();
        return data.timezone;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}


async function getWeatherFromTomorrow(latitude, longitude, timezone) {
    const apiUrl = 'https://api.tomorrow.io/v4/timelines?apikey=1V5saa9Sq7J3SgAzEtFWFM3wKIUZE1iE';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            location: [latitude, longitude],
            fields: ['temperature', 'humidity', 'windSpeed', 'weatherCode'],
            units: 'metric',
            timesteps: ['1h', '1d'],
            startTime: 'now',
            endTime: 'nowPlus5d',
            timezone
        })
    };

    try {
        const response = await fetch('https://api.tomorrow.io/v4/timelines?apikey=1V5saa9Sq7J3SgAzEtFWFM3wKIUZE1iE', options);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

function displayWeather(weatherData) {
    // Access the DOM elements where you want to display the weather data
    const weatherInfoElement = document.getElementById("weatherInfo");
    const hourlyForecastElement = document.getElementById("hourlyForecast");
    const dailyForecastElement = document.getElementById("dailyForecast");

    // Check if weatherData contains the 'timelines' property
    if (!weatherData.data || !Array.isArray(weatherData.data.timelines)) {
        displayError("Failed to retrieve weather data.");
        return;
    }

    // Extract the current weather data from the first timeline interval
    const currentWeatherData = weatherData.data.timelines[0].intervals[0].values;

    // Update the weather info element with general weather information
    weatherInfoElement.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${currentWeatherData.temperature}°F</p>
        <p>Humidity: ${currentWeatherData.humidity}%</p>
        <p>Wind Speed: ${currentWeatherData.windSpeed} mph</p>
        <p>Weather Code: ${currentWeatherData.weatherCode}</p>
    `;

    // Update the hourly forecast element with hourly weather forecast data
    // (Assuming the hourly forecast data is available in the second timeline)
    if (weatherData.data.timelines.length > 1) {
        const hourlyForecast = weatherData.data.timelines[1].intervals.map(interval => `
            <div>
                <p>Time: ${new Date(interval.startTime).toLocaleTimeString()}</p>
                <p>Temperature: ${interval.values.temperature}°F</p>
                <p>Humidity: ${interval.values.humidity}%</p>
                <p>Wind Speed: ${interval.values.windSpeed} mph</p>
                <p>Weather Code: ${interval.values.weatherCode}</p>
            </div>
        `).join('');
        hourlyForecastElement.innerHTML = `<h2>Hourly Forecast</h2>${hourlyForecast}`;
    }

    // Update the daily forecast element with daily weather forecast data
    if (weatherData.data.timelines.length > 0) {
        const dailyForecast = weatherData.data.timelines[0].intervals.slice(0, 5).map(interval => `
            <div>
                <h3>${new Date(interval.startTime).toLocaleDateString()}</h3>
                <p>Temperature: ${interval.values.temperatureHigh}°F / ${interval.values.temperatureLow}°F</p>
                <p>Humidity: ${interval.values.humidity}%</p>
                <p>Wind Speed: ${interval.values.windSpeed} mph</p>
                <p>Weather Code: ${interval.values.weatherCode}</p>
            </div>
        `).join('');
        dailyForecastElement.innerHTML = `<h2>Daily Forecast</h2>${dailyForecast}`;
    }
}



// Function to display error message on the webpage
function displayError(message) {
    // Access the DOM element where you want to display the error message
    const errorElement = document.getElementById("error");

    // Update the DOM element with the error message
    errorElement.textContent = message;
}

// Event listener for search button click
document.getElementById("searchBtn").addEventListener("click", function() {
    const city = document.getElementById("cityInput").value.trim();
    if (city !== "") {
        fetchWeatherData(city);
    } else {
        displayError("Please enter a city name.");
    }
});
