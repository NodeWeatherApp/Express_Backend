const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

var bodyParser = require('body-parser');
// support json encoded bodies
router.use(bodyParser.json()); 
// support encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); 

//Swagger Doc POST CreateUser API
/**
 *  @swagger
 *  /user/signUp:
 *    post:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Create a user's login credentials.
 *      parameters:
 *        - in: formData
 *          name: email
 *          type: string
 *          required: true
 *          description: email
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

router.post("/signUp", userController.user_create);

// //Swagger Doc POST CreateUser API
// /**
//  *  @swagger
//  *  /user/retreive:
//  *    get:
//  *      summary: Get all users;
//  *    -in
//  */

 router.get("/retrieve", userController.user_get_all);


//Swagger Doc POST User Login API
/**
 *  @swagger
 *  /user/login:
 *    post:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: User Login.
 *      parameters:
 *        - in: formData
 *          name: email
 *          type: string
 *          required: true
 *          description: email
 *        - in: formData
 *          name: password
 *          type: string
 *          required: true
 *          description: password
 *      responses:
 *        '200':
 *          description: OK
 */

router.post("/login", userController.user_login);
//Swagger Doc POST CreateUser API
/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *          type: object
 */


module.exports = router;