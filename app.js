const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const process = require('process');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

const STATUS_CODES = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '641ff814e3b4922d46b32ee4',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => {
  res.status(STATUS_CODES.ERR_NOT_FOUND).send({ message: 'Сервер не может обработать запрос.' });
  process.on('uncaughtException', () => {
    res.status(STATUS_CODES.ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
  });
});

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    app.listen(PORT, () => {
      // console.log('app started')
    });
  });
