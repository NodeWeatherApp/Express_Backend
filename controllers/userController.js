// user index, user_details, user_login_post, user_create_post, user_delete
const users = [];

const user_create_post = (req, res) => {
  const user = { username: req.body.username, password: req.body.password };
  users.push(user);
  console.log(users);

  res.status(201).send("Success");
};

const user_login_post = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let user_found = users.filter(
    (user) => user.username == username && user.password
  );
  console.log(user_found);
  user_found.length >= 1 ? res.status(200).send(`Username: ${username} Password: ${password}`) : res.status(400).send("Error")
};


module.exports = {
  user_create_post,
  user_login_post,
};
