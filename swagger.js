const { getMaxListeners } = require("./config/db");

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Customer API",
    description: "Customer API Information",
    contact: {
      name: "Deion Shallenberger",
      email: "deion.shallenberger.170@my.csun.edu",
    },
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json','application/x-www-form-urlencoded'],
  produces: ['application/json','application/x-www-form-urlencoded'],
  definitions: {
    User: {
      email: "testswagger@getMaxListeners.com",
      username: "deion",
      password: "test123",
    }
  }
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app"); // Your project's root file
});
