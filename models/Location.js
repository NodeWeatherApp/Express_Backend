const Sequelize = require("sequelize");
const db = require("../config/db");

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

module.exports = Location;
 