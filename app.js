const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const process = require('process');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

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

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res, next) => {
  process.on('uncaughtException', (err) => {
    res.status(STATUS_CODES.ERR_DEFAULT).send({ message: `На сервере произошла ошибка: ${err.name}` });
  });

  next();
});

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    app.listen(PORT);
  });
