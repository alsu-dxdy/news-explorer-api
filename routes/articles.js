const router = require('express').Router();
const { celebrate } = require('celebrate');

// eslint-disable-next-line object-curly-newline
const { getArticles, createArticle, getArticleById, removeArticleById } = require('../controllers/articles');
const { postArticleSchema } = require('../schemasJoi/postArticleSchema');
const { articleIdSchema } = require('../schemasJoi/articleIdSchema');

router.get('/', getArticles);
router.post('/', celebrate(postArticleSchema), createArticle);
router.delete('/:articleId', celebrate(articleIdSchema), getArticleById, removeArticleById);

module.exports = router;
