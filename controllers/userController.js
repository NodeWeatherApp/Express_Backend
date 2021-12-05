const User = require('../models/userModel');
const { findAll } = require('../models/userModel');
// user index, user_details, user_login, user_create, user_delete

exports.user_create = async(req, res, next) => {
  let user = new User( req.body.email, req.body.username, req.body.password,);
  user = await user.save();
  console.log(user);

  res.status(201).send("Success");
};

exports.user_get_all = async(req, res, next) => {
  let all_users = User.findAll();
  console.log(all_users);
  
  res.status(200).send("Ok");
}

exports.user_get_by_id = async(req, res, next) => {


}

exports.user_login = async(req, res, next) => {
  let email = req.body.email;
  console.log(req.body);
  let password = req.body.password;

  let user_found = users.filter(
    (user) => user.email == email && user.password
  );
  console.log(user_found);
  user_found.length >= 1 ? res.status(200).send(`Email: ${email} Password: ${password}`) : res.status(400).send("Error")
};


