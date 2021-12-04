const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

var bodyParser = require('body-parser');
// support json encoded bodies
router.use(bodyParser.json()); 
// support encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); 

//Swagger Doc POST CreateUser API
/**
 *  @swagger
 *  /user/create:
 *    post:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Create a user's login credentials.
 *      parameters:
 *        - in: formData
 *          name: username
 *          type: string
 *          required: true
 *          description: username
 *        - in: formData
 *          name: password
 *          type: string
 *          required: true
 *          description: password
 *      responses:
 *        '200':
 *          description: OK
 */

router.post("/create", userController.user_create_post);

/**
 *  @swagger
 *  /user/login:
 *    post:
 *      description: Login User
 *      responses:
 *        '200':
 *          description: A successful response
 */

router.post("/login", (req, res) => {

  res.status(204).send(`Username: ${firstname} Password: ${lastname}`);
});

module.exports = router;