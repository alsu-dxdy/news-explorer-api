const { Joi } = require('celebrate');

module.exports.articleIdSchema = {
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
};
