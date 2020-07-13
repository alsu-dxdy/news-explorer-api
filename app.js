require('dotenv').config();
const express = require('express');
const cors = require('cors'); // браузер отправляет сначала запрос OPTIONS, содержащий заголовки,
// с какого домена пришел запрос, сервер должен "разрешить" запросы с помощью заголовков ответа
const cookieParser = require('cookie-parser');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { limiter } = require('./limiter');

const { centrErrorHandler } = require('./centrErrorHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DATABASE_URL } = require('./config');

const whitelist = [
  'http://localhost:8080',
  'https://alsu-dxdy.github.io',
  'https://www.iseeknews.space',
  'http://www.iseeknews.space',
  'https://iseeknews.space',
  'http://iseeknews.space',
];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // для передачи заголовка Access-Control-Allow-credentials
};

// const corsOptions = {
//   origin: 'https://iseeknews.space',
//   credentials: true,
// };

// подключаемся к серверу mongo
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.use(cors(corsOptions));
app.use(cookieParser());// подключаем парсер кук как мидлвэр
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
app.use(centrErrorHandler);
