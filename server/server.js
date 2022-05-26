const express = require('express');
const request = require("request");
const dotenv = require('dotenv');
dotenv.config();

//Configure private variables.
let port = process.env.PORT;
const apiKey = `${process.env.API_KEY}`

// Create express application
const app = express();
const weatherRoute = require('./routes/weather');

// Set up route for requests
app.use('/api/weather', weatherRoute);

// GET Method to server entry HTML page.
app.get('/', (req, res) => {
    let now = new Date();
    console.log('\x1b[36m%s\x1b[0m', `Main page was requested | Time: ${now} `);
    res.sendFile(__dirname + '/views/index.html')
});

// Entry point for API
app.get('/api', (req, res) => {
    res.send('Welcome to the main entry point. For Weather data visit /api/weather');
});

// Starting the server
app.listen(port, function () {
    console.log(`Server listening on http://localhost:${port}/`);
    });
