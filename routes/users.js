const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  modifyUser,
  changeAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.patch('/me', modifyUser);
usersRouter.patch('/me/avatar', changeAvatar);

module.exports = usersRouter;
