const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
// const AuthError = require('../utils/errors/AuthError');
const IncorrectError = require('../utils/errors/IncorrectError');
// const DatabaseError = require('../utils/errors/DatabaseError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
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
      res.status(200).send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const userId = req.params.userId || req.user._id;
  // console.log(userId);
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найдён');
    })
    .then((user) => {
      res.status(200).send(user);
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
      res.status(200).send(user);
    })
    .catch(next);
};

const modifyUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => (err.name === 'ValidationError'
      ? next(new IncorrectError('Введены неверные данные'))
      : next(new NotFoundError('Пользователь не найден'))));
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
      res.status(200).send(user);
    })
    .catch((err) => (err.name === 'CastError'
      ? next(new IncorrectError('Введены неверные данные'))
      : next(new NotFoundError('Пользователь не найден'))));
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  modifyUser,
  changeAvatar,
};
