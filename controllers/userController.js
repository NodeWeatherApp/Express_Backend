const User = require("../models/User");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const createToken = require("../handlers/token/createToken");

// Validation
const { signUpValidation, loginValidation } = require("../validation");

exports.user_create = async (req, res, next) => {
  try {
    // Validate data for user creation
    await signUpValidation(req.body);

    const { email, username, password } = req.body;
    console.log(email, username, password);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const savedUser = await User.create({
      email,
      username,
      password: hashedPassword,
    })
      .then(console.log("saved User"))
      .catch((err) => {
        console.log(err);
        next(err);
      });

    // Create and assign a token
    const token = createToken(savedUser.dataValues.id);

    res
      .status(201)
      .json({ message: "User created", response: savedUser, token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.user_login = async (req, res, next) => {
  try {
    // Validate response body
    loginValidation(req.body);

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({where: {email : email}});
    if (user == null){
      return res.status(400).send({ error: "Email not found"});
    }
    
    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.dataValues.password);
    if (!validPassword) return res.status(400).send({ error: "password is wrong" });
   
    // Create and assign a token
    const token = createToken(user.dataValues.id);
    res
      .header("auth-token", token)
      .send({ res: "logging in", username: user.dataValues.username, token: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.user_logout = async (req, res, next) => {
  try {
    res.send({ token: "" }); //force token to expire, replace w/ empty token
  } catch (error) {
    console.log(error);
    next(error);
  }
};
