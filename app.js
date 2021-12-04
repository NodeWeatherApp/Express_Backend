const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const port = process.env.PORT || 5000;
var cors = require("cors");

app.use(express.json());

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
app.use(cors());
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

//Swagger Doc WeatherForecast API
/**
 *  @swagger
 *  /WeatherForecastController:
 *    get:
 *      description: Use to request all weather data
 *      responses:
 *        '200':
 *          description: A successful response
 */

function getRandomWeather(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomForecast() {
  let forecast = [
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
  let random_val = Math.floor(Math.random() * forecast.length);
  return forecast[random_val];
}
function getDatetime() {
  let currentdate = new Date();
  let datetime =
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

  return datetime;
}
function getID() {
  return id++;
}
const weather = [];
let id = 1;

app.get("/WeatherForecastController", (req, res) => {
  const currentWeather = {
    id: getID(),
    forecast: getRandomForecast(),
    temperature: getRandomWeather(-20, 55),
    date: getDatetime(),
  };
  console.log(currentWeather);

  weather.push(currentWeather);
  JSON.stringify(weather);
  res.status(200).send(weather);
});

//Swagger Doc POST CreateUser API
/**
 *  @swagger
 *  /CreateUser:
 *    post:
 *      description: Post User To Database
 *      parameters:
 *        - in: body
 *          name: UserName
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - userName
 *            properties:
 *              userName:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        '201':
 *          description: Created User
 */
const users = [];

app.post("/CreateUser", (req, res) => {
  const user = {userName: req.body.userName, password: req.body.password }
  users.push(user);
  console.log(users);

  res.status(201).send('Success');
});

// Extended: https://swagger.io/specification/#infoObject

/**
 *  @swagger
 *  /login:
 *    post:
 *      description: Use to Login
 *      responses:
 *        '200':
 *          description: A successful response
 */

app.post("/Login", (req, res) => {
  res.status(204).send(`Username: ${firstname} Password: ${lastname}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
