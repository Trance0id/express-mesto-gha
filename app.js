const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/users', usersRoute);

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
