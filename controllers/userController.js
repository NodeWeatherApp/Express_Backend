const User = require("../models/userModel");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const createToken = require("../handlers/token/createToken");

// Validation
const { signUpValidation, loginValidation } = require("../validation");

exports.user_create = async (req, res, next) => {
  try {
    // Validate data for user creation
    signUpValidation(req.body);
    const { email, username, password } = req.body;
    console.log(email, username, password);
    // Check if the user is already in the database
    const [foundUser, _] = await User.findOne(email);
    if (foundUser.length > 0)
      return res.status(400).send({ error: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    let user = new User(email, username, hashedPassword);
    const [savedUser, __] = await user.save();

    // Create and assign a token
    const token = createToken(savedUser[0].id);

    res
      .status(201)
      .json({ message: "User created", response: savedUser, token: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.user_get_all = async (req, res, next) => {
  try {
    let [users, _] = await User.findAll();

    res.status(200).json({ count: users.length, user: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.user_get_by_id = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let [user, _] = await User.findById(postId);

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.user_login = async (req, res, next) => {
  try {
    // Validate response body
    loginValidation(req.body);

    // Check if the email exists
    let { email, password } = req.body;
    const [user, _] = await User.findOne(email);
    if (user.length === 0)
      return res.status(400).send({ error: "Email is not found" });

    // Check if password is correct
    const validPass = await bcrypt.compare(password, user[0].password);
    if (!validPass) return res.status(400).send({ error: "password is wrong" });

    // Create and assign a token
    const token = createToken(user[0].id);
    res
      .header("auth-token", token)
      .send({ username: user[0].username, token: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.user_logout = async (req, res, next) => {
  try {
    res.send({token: ""}); //force token to expire, replace w/ empty token
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// delete user
