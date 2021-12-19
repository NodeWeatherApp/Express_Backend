const express = require("express");
const router = express.Router();

// Token authentication
const verify = require("../handlers/token/verifyToken");

// Import business logic
const locationController = require("../controllers/locationController");

// Middleware
router.get("/", verify, locationController.location_get_all);

router.post("/create", locationController.location_create);

router.delete("/delete/:id", locationController.location_delete);

router.put("/edit", locationController.location_update);

module.exports = router;
