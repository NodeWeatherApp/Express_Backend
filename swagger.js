const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.8.3",
    title: "Customer API",
    description: "Customer API Information",
    contact: {
      name: "Deion Shallenberger",
      email: "deion.shallenberger.170@my.csun.edu",
    },
  },
  host: "node-mysql-deploy-heroku.herokuapp.com",
  basePath: "/",
  schemes: ["https"],
  consumes: ["application/json", "application/x-www-form-urlencoded"],
  produces: ["application/json", "application/x-www-form-urlencoded"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      description: "Value: bearerAuth {jwt}",
      in: "header",
      name: "auth-token",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  security: [{ Bearer: ["./routes/*.js"] }],
  definitions: {
    User: {
      email: "test@gmail.com",
      username: "test1",
      password: "password",
    },
    Location: {
      country: "USA",
      state: "CA",
      city: "San Francisco"
    },
    Weather: {
      forecast: "Sunny",
      temperature: "85.0",
      date: "12-06-1972",
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app"); // Your project's root file
});
