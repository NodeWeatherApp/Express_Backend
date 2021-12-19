const express = require('express');
const router = express.Router();

// Token authentication
const verify = require("../handlers/token/verifyToken");

// Import business logic
const weatherController = require('../controllers/weatherController');

// Middleware
router.get("/:locationId",verify,  weatherController.weather_get_all);

router.post("/create",verify, weatherController.weather_create);

module.exports = router;