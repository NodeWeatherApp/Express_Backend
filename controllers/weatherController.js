const randomWeather = require("../handlers/weatherHandler");
const Weather = require("../models/Weather");

exports.weather_create = async (req, res, next) => {
  try {
    const { forecast, temperature, date, locationId } = req.body;

    // Create new location
    const weather = await Weather.create({
      forecast,
      temperature,
      date,
      locationId,
    })
      .then(console.log("weather object created"))
      .catch((err) => {
        console.log(err);
        next(err);
      });

    res.status(201).json({ created: weather.dataValues });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.weather_get_all = async (req, res, next) => {
  console.log("here")
  Weather.findAll({
    where: {
      locationId: req.params.locationId,
    },
  })
    .then((weather) => {
      console.log(weather);
      res.status(200).json({ response: "success", weather: weather });
    })
    .catch((err) => console.log(err));
};
