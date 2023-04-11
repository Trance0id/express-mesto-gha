const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const IncorrectError = require('../utils/errors/IncorrectError');
const ConflictError = require('../utils/errors/ConflictError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: 'Вы успешно авторизовались' });
    })
    .catch((err) => {
      res.clearCookie('jwt');
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('Пользователи не найдёны');
    })
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const userId = req.params.userId || req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найдён');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      User.findById(user._id)
        .then((userFound) => {
          res.send(userFound);
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectError('Введены неверные данные'));
      } else {
        next(err);
      }
    });
};

const modifyUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectError('Введены неверные данные'));
      } else {
        next(err);
      }
    });
};

const changeAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectError('Введены неверные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  modifyUser,
  changeAvatar,
};
