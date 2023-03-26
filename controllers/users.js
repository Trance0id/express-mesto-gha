const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => { console.log(`error in getUsers: ${err}`); });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new Error('Такой пользователь не найден!');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => { console.log(`error in getUser: ${err}`); });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => { console.log(`error in createUser: ${err}`); });
};

module.exports = { getUsers, getUser, createUser };
