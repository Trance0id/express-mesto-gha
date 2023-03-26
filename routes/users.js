const usersRoute = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

usersRoute.get('/', getUsers);
usersRoute.get('/:userId', getUser);
usersRoute.post('/', createUser);

module.exports = usersRoute;
