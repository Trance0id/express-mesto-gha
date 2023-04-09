const jwt = require('jsonwebtoken');
// const NotFoundError = require('../utils/errors/NotFoundError');
const AuthError = require('../utils/errors/AuthError');
// const IncorrectError = require('../utils/errors/IncorrectError');
const DatabaseError = require('../utils/errors/DatabaseError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return new AuthError('Токен не обнаружен');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      next(new DatabaseError('Пользователь с таким email уже существует'));
    }
  }

  req.user = payload;

  return next();
};
