const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();

const { linkPattern } = require('../utils/constants');

const {
  getUsers,
  getUser,
  modifyUser,
  changeAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), modifyUser);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkPattern),
  }),
}), changeAvatar);

module.exports = usersRouter;
