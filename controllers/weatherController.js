const randomWeather = require("../handlers/weatherHandler");
const Weather = require("../models/Weather");
const makeWeatherDTO = require("../DTO/WeatherDTO");

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
  Weather.findAll({
    where: {
      locationId: req.params.locationId,
    },
    raw: true,
  })
    .then((weather) => {
      const weatherDTO = makeWeatherDTO(weather);
      res.status(200).json({
        response: "success",
        weather: weatherDTO,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.weather_update = async (req, res, next) => {
  const { forecast, temperature, date } = req.body;
  console.log(req.body);
  Weather.update(
    {
      forecast,
      temperature,
    },
    {
      where: {
        date: date,
      },
    }
  )
    .then(() => res.send("successfully updated"))
    .catch((err) => {
      res.status(400);
      next(err);
      console.log(err);
    });
};

exports.weather_delete = async (req, res, next) => {
  Weather.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("success"));
};
