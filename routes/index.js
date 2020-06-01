const router = require('express').Router();
const { celebrate } = require('celebrate');
// const users = require('./users');
// const articles = require('./articles');
const auth = require('../middlewares/auth');
const { signUpSchema } = require('../schemasJoi/signup');
const { signInSchema } = require('../schemasJoi/signin');
// const createUser = require('../controllers/users');
// const login = require('../controllers/users');

const { createUser, login } = require('../controllers/users');

router.post('/signup', celebrate(signUpSchema), createUser);
router.post('/signin', celebrate(signInSchema), login);

// авторизация
router.use(auth);
router.use('/users', require('./users'));
router.use('/articles', require('./articles'));


router.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});


// router.post('/signUp', celebrate(schema), auth.signUp);
// router.post('/signIn', auth.signIn);

// router.use('/auth', require('./auth'));

// router.use('/cards', auth.authenticate, cards);
// router.use('/users', users);
// router.use('*', (req, res, next) => {
//   next({ status: 404, message: 'route not found' })
// });

module.exports = router;
