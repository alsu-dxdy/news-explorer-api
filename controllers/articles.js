// импортируем модель
const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('owner')
    .orFail(new NotFoundError('Articles does not exist'))

    .then((articles) => res.send({ articles }))
    .catch(next);
};

module.exports.getArticleById = (req, res, next) => {
  Article
    .findById(req.params.articleId)
    .select('+owner')
    .orFail(() => {
      throw new NotFoundError(`article with ID ${req.params.articleId} does not exist`);
    })
    .then((article) => {
      req.article = article;
      next();
    })
    .catch(next);
};


module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ article }))
    .catch(next);
};

module.exports.removeArticleById = (req, res, next) => {
  // если владельцы не совпали
  if (req.user._id !== req.article.owner.toString()) {
    throw new ForbiddenError('Access rights error');
  }
  Article.remove({ _id: req.params.articleId })
    .then(() => {
      res.send({ data: `Article with ID ${req.params.articleId} is deleted` });
    })
    .catch(next);
};
