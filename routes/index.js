const router = require('express').Router();
const { celebrate } = require('celebrate');

const auth = require('../middlewares/auth');
const { signUpSchema } = require('../schemasJoi/signup');
const { signInSchema } = require('../schemasJoi/signin');

const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', celebrate(signUpSchema), createUser);
router.post('/signin', celebrate(signInSchema), login);

// авторизация
router.use(auth);
router.use('/users', require('./users'));
router.use('/articles', require('./articles'));

router.delete('/logout', logout);

router.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
