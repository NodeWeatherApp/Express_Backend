const randomWeather = require("../handlers/weatherHandler");
const Weather = require("../models/Weather");

exports.weather_generate = async (req, res, next) => {
  try {
    // Create weather object
    const weather = new Weather(
      randomWeather.getRandomForecast(),
      randomWeather.getRandomTemperature(10,50),
      randomWeather.getDatetime()
    );
    const savedWeather = await weather.save();
    console.log(savedWeather);
    // JSON.stringify(weather);
    res.status(201).json({ message: "weather saved", response: savedWeather });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.weather_get_all = async (req, res, next) => {
  try {
    let [weatherData, _] = await Weather.findAll();

    res.status(200).json({ count: weatherData.length, data: weatherData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
