const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return new AuthError('Токен не обнаружен');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthError('Ошибка проверки токена'));
  }

  req.user = payload;

  return next();
};
