const { Joi } = require('celebrate');

module.exports.signInSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^[`!@#$%^&*()_=+{};:"\\|,.]{8,30}$/), // экранирую спец символы
  }),
};
