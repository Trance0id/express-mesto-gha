const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

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

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listening ${PORT} port`);
    });
  })
  .catch((err) => {
    console.log(`Huston: ${err}`);
  });
