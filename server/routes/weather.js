const express = require('express');
const request = require('request');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// GET Method with parameter of city.
// Gets JSON object from open weather API. 
router.get('/:city', (req, res) => {

    let city = req.params.city.toLowerCase();
    let now = new Date();

    request(`https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${ process.env.API_KEY }`, function(error, response, body) {
        //Remember to parse body to JSON or the data will be wrapped in string quotes.
        res.json(JSON.parse(body))
        if (response.statusCode == 404) {
            console.error("\x1b[31m", `404 | New request ${ city } not found | RequestTime: ${ now }`)
        }
        else{
            console.info('\x1b[36m%s\x1b[0m', `New weather request from client | CityRequested: ${ city } | RequestTime: ${ now }`);
        }
        
    });
});

module.exports = router;