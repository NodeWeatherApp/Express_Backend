const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

//Swagger Doc WeatherForecast API
/**
 *  @swagger
 *  /weather/data:
 *    get:
 *      description: Use to request all weather data
 *      responses:
 *        '200':
 *          description: A successful response
 */

 // route GET and POST weather data
// router.route("/data").get(weatherController.weather_data_get).post(weatherController.weather_data_post);

module.exports = router;