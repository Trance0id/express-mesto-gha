// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message, code } = err;
  if (code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже существует' });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
};
