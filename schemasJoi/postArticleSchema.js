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
      .regex(/^http(s)?:\/\/(www\.)?(?!(www\.))(([0-2][0-5][0-5]\.){3}[0-2][0-5][0-5]|([a-z0-9]{2,}[-a-z0-9]*\.)+[a-z]{2,6})(\/)?(:\d{2,5})?([-?=&A-Za-z0-9.]{2,}\/?)*#?\d?$/)
      .required(),
    image: Joi.string()
      .required(),
  }),
};
