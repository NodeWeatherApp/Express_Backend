const jwt = require("jsonwebtoken");

// Five hours in seconds
const maxSession = 500*60; 

// Create a token
module.exports = createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
      expiresIn: maxSession
  });
};
