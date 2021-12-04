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

  router.get("/data", weatherController.weather_data_get);

  module.exports = router;