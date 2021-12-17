const randomWeather = require("../handlers/weatherHandler");
const Weather = require("../models/Weather");

exports.weather_create = async (req, res, next) => {
  const { forecast, temperature, date, locationId } = req.body;

  // Create new location
  const weather = await Weather.create({
    forecast,
    temperature,
    date,
    locationId,
  })
    .then(console.log(weather))
    .catch((err) => console.log(err));

  res.status(201).json({ created: weather.dataValues });
};

