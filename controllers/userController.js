const User = require("../models/userModel");
const { response } = require("express");

exports.user_create = async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    let user = new User(email, username, password);

    user = await user.save();

    res.status(201).json({ message: "User created" });
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
    console.log(login);

    res.status(201).json({ login: "login successful" });
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
