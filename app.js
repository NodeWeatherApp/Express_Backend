const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const { createProxyMiddleware } = require("http-proxy-middleware");
var cors = require("cors");

const userRoutes = require('./routes/userRoutes.js');
const weatherRoutes = require('./routes/weatherRoutes');

app.use(express.json());

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


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

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// cors
app.use(cors());

// middleware
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

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// weather routes
app.use('/weather',weatherRoutes);

// user routes
app.use('/user',userRoutes);

// server port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
