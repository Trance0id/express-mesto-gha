// const mongoose = require('mongoose');
const Card = require('../models/card');

const onNotFound = (res) => {
  res.status(404).send({ message: 'Запрашиваемая карточка не найдена.' });
};

const onValidationError = (res) => {
  res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
};

const onStandartError = (res) => {
  res.status(500).send({ message: 'Ошибка сервера.' });
};

const errorHandler = (err, res) => {
  if (err.name === 'CastError') {
    onNotFound(res);
    return;
  }
  if (err.name === 'ValidationError') {
    onValidationError(res);
    return;
  }
  onStandartError(res);
};

const getCards = (req, res) => {
  Card.find({})
    .orFail(() => onNotFound(res))
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create(
    { name, link, owner: ownerId },
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail(() => onNotFound(res))
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const unLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => onNotFound(res))
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
};
