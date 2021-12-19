const jwt = require("jsonwebtoken");

// Middleware method for authentication
module.exports = function (req, res, next) {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({msg: "token not valid", auth: false});
    else {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      return next();
      res.status(200).send({msg: "token valid", auth: true, verified: verified.exp})
      
    }
    
    
    // req.user = verified;
  } catch (err) {
    
    res.status(400).send("Error");
    next(err);
  }
};
