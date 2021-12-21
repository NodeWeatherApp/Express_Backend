// Validation
const Joi = require("joi");

// SignUp Validation
const signUpValidation = (data) => {
    const schema = Joi.object().keys({
      email: Joi.string().min(5).required().email(),
      username: Joi.string().min(1).required(),
      password: Joi.string().min(3).required(),
    });

    Joi.assert(data, schema);
    console.log("joi validation tests passed for User");
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(1).required().email(),
    password: Joi.string().min(3).required(),
  });

  return Joi.assert(data, schema);
};

module.exports = {
  signUpValidation,
  loginValidation,
};
