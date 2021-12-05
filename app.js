// allows env variables to be set on process.env
require("dotenv").config(); 

const express = require("express");
const app = express();

// swagger docs
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Deion Shallenberger",
        email: "deion.shallenberger.170@my.csun.edu"
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ['./routes/*.js'],
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// cors
var cors = require("cors");
app.use(cors());

// middleware
const { createProxyMiddleware } = require("http-proxy-middleware");
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
app.use(express.json()); // parse json bodies in request object

// weather routes
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/weather',weatherRoutes);

// user routes
const userRoutes = require('./routes/userRoutes.js');
app.use('/user',userRoutes);

// listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
