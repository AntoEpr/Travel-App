// Setup Server
import('node-fetch').then(({ default: fetch }) => {
const express = require('express');
const app = express();
const cors = require('cors');

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

const port = 5500;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// POST route to update projectData
app.post('/all', (req, res) => {
    //Getting user imput data
    const newData = req.body;
    //Geonames API route
    const geonamesAPIroute = (`http://api.geonames.org/searchJSON?name=${req.body.destination}&maxRows=1&username=${process.env.GEONAMES-API}`);

    //Geonames Data
    fetch (geonamesAPIroute)
    .then (res => res.json())
    .then (geonamesData => {

    // Weatherbit API Variable
    const weatherbitAPI = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geonamesData.geonames[0].lat}&lon=${geonamesData.geonames[0].lng}&key=${process.env.WEATHERBIT-API}`;

    //Weatherbit Data
    fetch (weatherbitAPI)
    .then (res => res.json())
    .then (weatherbitData => {
    
    //Pixabay API
    const pixabayAPI = `https://pixabay.com/api/?key=${process.env.PIXABAY-API}&q=${req.body.destination}&image_type=photo&editors_choice=true&per_page=3`;
    
    // Get Pixabay Dynamic Data
    fetch (pixabayAPI)
    .then (res => res.json())
    .then (pixabayData => {
    // Sent Data
        res.send({newData, geonamesData, weatherbitData, pixabayData,});
                    })
                })
            })
        });

// Server Testing
const mockAPIResponse = require('./mockAPI.js');

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});
})