const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

const { JWT_SECRET } = require('../config');

const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // достаем токен

  if (!token) {
    throw new AuthorizationError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
