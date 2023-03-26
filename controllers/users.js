const User = require('../models/user');

const onNotFound = (res) => {
  res.status(404).send({ message: 'Запрашиваемый пользователь не найден.' });
};

const onValidationError = (res) => {
  res.status(400).send({ message: 'Переданы некорректные данные пользователя.' });
};

const onStandartError = (res) => {
  res.status(500).send({ message: 'Ошибка сервера.' });
};

const errorHandler = (err, res) => {
  if (err.name === 'CastError') {
    onNotFound(res);
    return;
  }
  if (err.name === 'ValidationError') {
    onValidationError(res);
    return;
  }
  onStandartError(res);
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new Error('Такой пользователь не найден!');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const modifyUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { ...req.body })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const changeAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports = {
  getUsers, getUser, createUser, modifyUser, changeAvatar,
};
