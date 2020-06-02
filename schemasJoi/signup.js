const { Joi } = require('celebrate');

module.exports.signUpSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .regex(/^[`!@#$%^&*()_=+{};:"\\|,.]{8,30}$/) // экранирую спец символы
      .required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};
