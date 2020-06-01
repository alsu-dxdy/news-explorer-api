const { Joi } = require('celebrate');

module.exports.signUpSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      // eslint-disable-next-line no-useless-escape
      .regex(/^[-!@#%a-zA-Z0-9_{}\]\[\\\^\$\.\|\?\*\+\(\)]{8,30}$/) // экранирую спец символы
      .required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};
