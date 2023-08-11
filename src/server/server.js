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
let projectData =[]
let data = []
app.post('/api', async (req,res)=>{
    data.push(req.body);
    console.log(`Data from client is ${data}`)
    const destination =data[0].destination
    //Type here what you want to do in your post
        //API fetch to get lat, long and country name from Geonames API
        const response = await fetch (`http://api.geonames.org/searchJSON?name=Milano&maxRows=1&username=AntoEpr`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            res.send(data) // This will display the actual data once the response is resolved
        })
        .catch(error =>console.log('error'))

})
// Define a route for serving the HTML file
app.get('/', (req, res) => {
    res.sendFile('dist/index.html'); // Change the path to your HTML file
});

