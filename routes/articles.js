const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getArticles, createArticle, getArticleById, removeArticleById,
} = require('../controllers/articles');
const { postArticleSchema } = require('../schemasJoi/postArticleSchema');
const { articleIdSchema } = require('../schemasJoi/articleIdSchema');

router.get('/', getArticles);
router.post('/', celebrate(postArticleSchema), createArticle);
router.delete('/:articleId', celebrate(articleIdSchema), getArticleById, removeArticleById);

module.exports = router;
