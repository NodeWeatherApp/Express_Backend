const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Deion Shallenberger",
      },
      servers: ["http://localhost:5000"],
    },
  },
  // ['.routes/*.js']
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({ 
  target: 'http://localhost:3000/', //original url
  changeOrigin: true, 
  //secure: false,
  onProxyRes: function (proxyRes, req, res) {
     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

// Routes
/**
 *  @swagger
 *  /WeatherForecastController:
 *    get:
 *      description: Use to request all weather data
 *      responses:
 *        '200':
 *          description: A successful response
 */

app.get("/WeatherForecastController", (req, res) => {
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  temperatureC = getRandomArbitrary(-20, 55);
  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  var forecast = [
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching",
  ];

  function getRandomForecast(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const weatherData = [
    {
    "id" : 1,
    "forecast": (forecast[getRandomForecast(0,forecast.length)]),
    "temperature": (temperatureC = getRandomArbitrary(-20, 55)),
    "date": datetime,
  }
  ];

  console.log(weatherData);

  res.status(200).send(weatherData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
