/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
require('dotenv').config();
const express = require('express');

const app = express();
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { isCelebrate } = require('celebrate');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DATABASE_URL } = require('./config');

// подключаемся к серверу mongo
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// подключаем helmet
app.use(helmet());

// подключаем rate-limiter
app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// обработчики ошибок
app.use(errorLogger); // подключаем логгер ошибок

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
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
});
