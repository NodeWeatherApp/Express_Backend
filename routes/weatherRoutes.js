const express = require("express");
const router = express.Router();

// Token authentication
const verify = require("../handlers/token/verifyToken");

// Import business logic
const weatherController = require("../controllers/weatherController");

// Middleware
router.get("/:locationId", verify, weatherController.weather_get_all);

router.post("/create", verify, weatherController.weather_create);

router.put("/edit", verify, weatherController.weather_update);

router.delete("/delete/:id", verify, weatherController.weather_delete);

module.exports = router;
