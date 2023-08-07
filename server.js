// Setup Server
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// Dependencies
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('website'));

const port = 5500;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// POST route to update projectData
app.post('/data', (req, res) => {
    const newData = req.body;
    projectData.temperature = newData.temperature;
    projectData.date = newData.date;
    projectData.userResponse = newData.userResponse;
    res.send(projectData);
});

// GET route to return projectData
app.get('/all', getALL);

function getALL(req, res) {
    res.status(200).send(projectData);
};