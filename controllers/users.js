const User = require('../models/user');

const STATUS_CODES = require('../utils/constants');

const onNotFound = (res) => {
  res.status(STATUS_CODES.ERR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден.' });
};

const onValidationError = (res) => {
  res.status(STATUS_CODES.ERR_INCORRECT).send({ message: 'Переданы некорректные данные пользователя.' });
};

const onStandartError = (res) => {
  res.status(STATUS_CODES.ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
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
  if (err.name === 'TypeError') {
    onValidationError(res);
    return;
  }
  if (err.message === 'Search returned null') {
    onNotFound(res);
    return;
  }
  onStandartError(res);
};

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      throw new Error('Search returned null');
    })
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
      throw new Error('Search returned null');
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
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const changeAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports = {
  getUsers, getUser, createUser, modifyUser, changeAvatar,
};
