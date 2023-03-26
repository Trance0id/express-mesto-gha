const Card = require('../models/card');
// const User = require('../models/user');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => { console.log(`error in getCards: ${err}`); });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => { console.log(`error in createCard: ${err}`); });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      throw new Error('Такая карточка не найдена!');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => { console.log(`error in deleteCard: ${err}`); });
};

module.exports = { getCards, createCard, deleteCard };
