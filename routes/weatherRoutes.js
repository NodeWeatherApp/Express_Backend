const express = require('express');

const router = express.Router();



//Swagger Doc WeatherForecast API
/**
 *  @swagger
 *  weather/data:
 *    get:
 *      description: Use to request all weather data
 *      responses:
 *        '200':
 *          description: A successful response
 */

function getRandomWeather(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function getRandomForecast() {
    let forecast = [
      "Freezing",
      "Bracing",
      "Chilly",
      "Cool",
      "Mild",
      "Warm",
      "Balmy",
      "Hot",
      "Sweltering",
      "Scorching",
    ];
    let random_val = Math.floor(Math.random() * forecast.length);
    return forecast[random_val];
  }
  function getDatetime() {
    let currentdate = new Date();
    let datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
  
    return datetime;
  }
  function getID() {
    return id++;
  }
  const weather = [];
  let id = 1;
  
  router.get("/data", (req, res) => {
    const currentWeather = {
      id: getID(),
      forecast: getRandomForecast(),
      temperature: getRandomWeather(-20, 55),
      date: getDatetime(),
    };
    console.log(currentWeather);
  
    weather.push(currentWeather);
    JSON.stringify(weather);
    res.status(200).send(weather);
  });

  module.exports = router;