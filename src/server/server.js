// Setup Server
const express = require('express');
const cors = require('cors');

const app = express();
// Dotenv Package (to setup environment variables)
const dotenv = require('dotenv');
dotenv.config();

// Dependencies
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('dist'));

//Port and routes

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

     //API keys variables
     const geonamesAPIKey =process.env.GEONAMES_API_KEY
     const pixabayAPIKey = process.env.PIXABAY
     const weatherbitAPIKey = process.env.WEATHERBIT 

let projectGeonamesData =[]
projectWeatherbitData =[]
projectForcastData=[]
app.post('/api', async (req, res) => {
    try {
        const data = req.body;
        console.log(`Data from client:`, data);

        const destination = data.destination;
        const encDest = data.encodedDestination
        console.log(`Destination:`, destination);

        // API fetch to get lat, long and country name from Geonames API
        const geonamesResponse = await fetch(`http://api.geonames.org/searchJSON?name=${destination}&maxRows=1&username=${geonamesAPIKey}`);
        const geonamesData = await geonamesResponse.json();

        console.log("Geonames Data:", geonamesData);
        const lat = geonamesData.geonames[0].lat;
        const lng = geonamesData.geonames[0].lng;

        // weatherbit fetch
        const weatherResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${weatherbitAPIKey}`);
        const weatherbitData = await weatherResponse.json();

        console.log("Weatherbit Data:", weatherbitData);

        // forcast weather fetch
        const responseForecastWeatherAPI = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${lat}&lon=${lng}&key=${weatherbitAPIKey}`);
        const forcastData = await responseForecastWeatherAPI.json();
        console.log("Forecast Data:", forcastData);

        //pixabay fetch
        const pixabayAPI = await fetch (`https://pixabay.com/api/?key=${pixabayAPIKey}&q=${encDest}`)
        const pixabayData = await pixabayAPI.json();

        // Store fetched data
        projectGeonamesData.push(geonamesData);
        projectWeatherbitData.push(weatherbitData);
        projectForcastData.push(forcastData);

        const responseData = {
            geonames: geonamesData,
            weather: weatherbitData,
            forcast: forcastData,
            pixabay: pixabayData,
        };
        res.json(responseData);
    } catch (error) {
        console.error('Error:', error);
    }
});
// Serve service-worker.js
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve('dist', 'service-worker.js'));
});
