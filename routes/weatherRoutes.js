const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

 // route GET and POST weather data
// router.route("/data").get(weatherController.weather_data_get).post(weatherController.weather_data_post);

module.exports = router;