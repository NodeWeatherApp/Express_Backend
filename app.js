// allows env variables to be set on process.env
require("dotenv").config(); 

const express = require("express");
const app = express();

const { createProxyMiddleware } = require("http-proxy-middleware");

// Import Routes
const weatherRoutes = require('./routes/weatherRoutes');
const userRoutes = require('./routes/userRoutes.js');

// Swagger-Autogen
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// cors
var cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json()); 

app.use('/weather',weatherRoutes);

app.use('/user',userRoutes);

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

// listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
