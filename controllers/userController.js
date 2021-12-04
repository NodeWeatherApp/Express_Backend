// user index, user_details, user_login_post, user_create_post, user_delete
const users = [];

const user_create_post = (req, res) => {
  const user = { username: req.body.username, password: req.body.password };
  users.push(user);
  console.log(users);

  res.status(201).send("Success");
};

const user_login_post = (req,res) => {

}
module.exports = {
    user_create_post,
    user_login_post
}