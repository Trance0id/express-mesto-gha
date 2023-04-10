const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('Ошибка авторизации'));
  }

  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};
