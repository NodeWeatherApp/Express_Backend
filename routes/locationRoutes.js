const express = require("express");
const router = express.Router();

// Token authentication
const verify = require("../handlers/token/verifyToken");

// Import business logic
const locationController = require("../controllers/locationController");

// Middleware
router.get("/",  locationController.location_get_all);

router.post("/create", verify, locationController.location_create);

module.exports = router;
