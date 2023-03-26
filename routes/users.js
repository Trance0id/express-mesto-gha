const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  modifyUser,
  changeAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', modifyUser);
usersRouter.patch('/me/avatar', changeAvatar);

module.exports = usersRouter;
