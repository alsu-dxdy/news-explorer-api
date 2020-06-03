const { Joi } = require('celebrate');

module.exports.signInSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .required(),
  }),
};
