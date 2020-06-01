const router = require('express').Router();
// const { celebrate } = require('celebrate');

// eslint-disable-next-line object-curly-newline
const { getUserById } = require('../controllers/users');
// const { userIdSchema } = require('../schemas/userId');


// router.get('/me', getUsers);
router.get('/me', getUserById);

module.exports = router;
