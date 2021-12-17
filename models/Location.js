const Sequelize = require("sequelize");
const db = require("../config/db");

const Weather = require("./Weather");

const Location = db.define("location", {
  country: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
});

// One to many relationship: location has many weather data
Location.hasMany(Weather);

// Weather belongs to Location: mapped by Location ID
Weather.belongsTo(Location);

module.exports = Location;
