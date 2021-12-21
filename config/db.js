require("dotenv").config();

const Sequelize = require("sequelize");

module.exports = new Sequelize(
  "heroku_5cff7007787fc23",
  "b42e921b82cdf9",
  "c89424bf",
  {
    host: "us-cdbr-east-05.cleardb.net",
    dialect: "mysql",
  }
);


