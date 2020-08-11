const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

const { JWT_SECRET } = require('../config');

// импортируем модель
const User = require('../models/user');

module.exports.getUserById = (req, res, next) => {
  User
    // .findById(req.params.userId)
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(`User with ID ${req.user._id} does not exist`);
    })
    .then((user) => {
      // res.send({ user });
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email });
    })
    .catch(next);
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((newUser) => {
      // не нашелся - отклоняем промис
      if (!newUser) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }
      // нашелся - сравниваем хеши
      return bcrypt.compare(password, newUser.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: newUser._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, { domain: '', httpOnly: true })
            .send({ data: newUser.name })
            .end();
        });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
module.exports.logout = (req, res) => {
  res
    .cookie('jwt', '', { domain: '', httpOnly: true, maxAge: 0 })
    .end();
};
