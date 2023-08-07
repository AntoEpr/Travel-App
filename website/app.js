//Global Variables
const apiKey = 'fa77154dc1840e4580f662dc95cf58a9';
const baseUrl = 'http://api.openweathermap.org/geo/1.0/zip';
const postUrl = 'http://localhost:5500/data';

// Add event listener for 'generate' button
document.getElementById('generate').addEventListener('click', performAction);

async function performAction() {
    // Retrieve zip code and user feelings
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    try {
        // Make async GET request to get latitude and longitude from the zip code
        const locationData = await getWeatherDataByZip(zipCode);

        // Extract latitude and longitude from the location data
        const lat = locationData.lat;
        const lon = locationData.lon;

        // Make async GET request to get weather data using latitude and longitude
        const weatherData = await getWeatherData(lat, lon);
        console.log(weatherData); // Log the weatherData object to the console

        // Use the weatherData to update UI
        const data = {
            temperature: weatherData.current.temp,
            date: new Date().toLocaleDateString(),
            userResponse: feelings,
        };

        // Make the POST request and update the UI
        const updatedData = await postData(postUrl, data);
        console.log(updatedData.timezone);
        // Update the UI dynamically with the received data
        document.getElementById('date').textContent = updatedData.date;
        document.getElementById('temp').textContent = updatedData.temperature;
        document.getElementById('content').textContent = updatedData.userResponse;
    } catch (error) {
        console.error('Error performing action:', error);
    }
}

// Async function to make the GET request to OpenWeatherMap API
async function getWeatherData(lat, lon) {
    // Construct the API URL with latitude and longitude
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        // Make the Fetch API call
        const response = await fetch(apiUrl);

        // Check if the response status is okay (200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Convert the response to JSON
        const data = await response.json();

        // Return the JSON data
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}
async function getWeatherDataByZip(zipCode) {
    // Construct the API URL with zip code (only US)
    const apiUrl = `${baseUrl}?zip=${zipCode},US&appid=${apiKey}`;

    try {
        // Make the Fetch API call
        const response = await fetch(apiUrl);

        // Check if the response status is okay (200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Convert the response to JSON
        const data = await response.json();

        // Return the JSON data
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;
    }
}
// Async function to make the POST request and receive the updated data
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error('Error parsing response:', error);
        throw error;
    }
}