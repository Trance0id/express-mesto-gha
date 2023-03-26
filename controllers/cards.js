const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => { console.log(`error in getCards: ${err}`); });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create(
    { name, link, owner: ownerId },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => { console.log(`error in createCard: ${err}`); });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      throw new Error('Такая карточка не найдена!');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => { console.log(`error in deleteCard: ${err}`); });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new Error('Такая карточка не найдена!');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => { console.log(`error in likeCard: ${err}`); });
};

const unLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new Error('Такая карточка не найдена!');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => { console.log(`error in unlikeCard: ${err}`); });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
};
