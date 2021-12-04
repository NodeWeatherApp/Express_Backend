const weatherHandler = require("../handlers/weatherHandler");
// weather_data_get
const weather = [];

const weather_data_get = (req, res) => {
  const currentWeather = {
    id: weatherHandler.getID(),
    forecast: weatherHandler.getRandomForecast(),
    temperature: weatherHandler.getRandomWeather(-20, 55),
    date: weatherHandler.getDatetime(),
  };
  console.log(currentWeather);

  weather.push(currentWeather);
  JSON.stringify(weather);
  res.status(200).send(weather);
};

module.exports = {
  weather_data_get,
};
