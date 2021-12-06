const User = require("../models/userModel");
const { response } = require("express");
const bcrypt = require("bcryptjs");

// Validation
const { signUpValidation, loginValidation } = require("../validation");

exports.user_create = async (req, res, next) => {
  try {
    // Validate Data for User Creation
    signUpValidation(req.body);
    let { email, username, password } = req.body;

    // Check if the user is already in the database
    const [foundUser, _] = await User.findOne(req.body.email);
    if (foundUser.length > 0)
      return res.status(400).send({ error: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    let user = new User(email, username, hashedPassword);
    const savedUser = await user.save();
    res.status(201).json({ message: "User created", response: savedUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.user_get_all = async (req, res, next) => {
  try {
    let [users, _] = await User.findAll();

    res.status(200).json({ count: users.length, users });
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
    let { email, password } = req.body;
    let [login, _] = await User.login(email, password);

    res.status(201).json({ login_status: "login successful", info: login });
  } catch (error) {
    console.log(error);
    next(error);
  }

  // let user_found = users.filter((user) => user.email == email && user.password);
  // console.log(user_found);
  // user_found.length >= 1
  //   ? res.status(200).send(`Email: ${email} Password: ${password}`)
  //   : res.status(400).send("Error");
};
