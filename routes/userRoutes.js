const express = require("express");
const router = express.Router();

// Token authentication
const verify = require("./verifyToken");

// Import business Logic
const userController = require("../controllers/userController");

var bodyParser = require("body-parser");
// support json encoded bodies
router.use(bodyParser.json());
// support encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

// Middleware
router.post("/signUp", userController.user_create);

router.get("/retrieve", verify, userController.user_get_all);

router.get("/:id", verify, userController.user_get_by_id);

router.post("/login", userController.user_login);

module.exports = router;
