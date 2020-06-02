const { isCelebrate } = require('celebrate');

module.exports.centrErrorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let { message } = err;
  // Условия расположены от более общих к частным случаям
  if (err.name === 'ValidationError') {
    message = 'ValidationError';
    status = 400;
  }

  if (isCelebrate(err)) {
    const errorField = err.joi.details[0].context.key;
    message = `Некорректные данные в поле ${errorField}`;
    status = 400;
  }

  if (err.message.includes('email') && err.message.includes('unique')) {
    message = 'User with this email already exists';
    status = 409;
  }

  if (err.message.includes('password') && err.message.includes('pattern')) {
    message = 'Password must include symbols only from range: [a-zA-Z0-9] and spec symbols';
    status = 400;
  }

  if (status === 500) {
    console.error(err.stack || err);
    message = 'unexpected error';
  }
  res.status(status).send({ message });
  next();
};
