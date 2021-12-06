// Validation
const Joi = require("joi");

// SignUp Validation
const signUpValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
  });

  return Joi.assert(data, schema);
};

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object().keys({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
  
    return Joi.assert(data,schema);
  };

module.exports = {
    signUpValidation,
    loginValidation
}
