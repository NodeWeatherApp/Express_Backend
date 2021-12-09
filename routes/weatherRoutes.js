const express = require('express');
const router = express.Router();

// Token authentication
const verify = require("./verifyToken");

// Import business logic
const weatherController = require('../controllers/weatherController');

// Middleware
router.post("/generate", verify, weatherController.weather_generate);

router.get("/retrieve",verify, weatherController.weather_get_all);

module.exports = router;