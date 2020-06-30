const { Joi } = require('celebrate');

module.exports.postArticleSchema = {
  body: Joi.object().keys({
    keyword: Joi.string()
      .min(2)
      .max(30)
      .required(),
    title: Joi.string()
      .min(2)
      .required(),
    text: Joi.string()
      .min(2)
      .required(),
    date: Joi.string()
      .min(2)
      .required(),
    source: Joi.string()
      .min(2)
      .required(),
    link: Joi.string()
      .required(),
    image: Joi.string()
      .required(),
  }),
};
