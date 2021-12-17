const Sequelize = require("sequelize");
const db = require("../config/db");

const Weather = db.define("weather", {
  forecast: {
    type: Sequelize.STRING,
  },
  temperature: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
});


module.exports = Weather;
