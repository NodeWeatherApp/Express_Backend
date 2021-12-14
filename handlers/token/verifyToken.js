const jwt = require("jsonwebtoken");

// Middleware method for authentication
module.exports = function(req, res, next) {;
  const token = req.header('auth-token');
  if (!token) return res.status(401).send("Access Denied: Please include valid token");
  
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
