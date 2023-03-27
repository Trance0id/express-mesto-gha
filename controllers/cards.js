const Card = require('../models/card');

const STATUS_CODES = require('../utils/constants');

const onNotFound = (res) => {
  res.status(STATUS_CODES.ERR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена.' });
};

const onValidationError = (res) => {
  res.status(STATUS_CODES.ERR_INCORRECT).send({ message: 'Переданы некорректные данные при создании карточки.' });
};

const onStandartError = (res) => {
  res.status(STATUS_CODES.ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
};

const errorHandler = (err, res) => {
  if (err.name === 'CastError') {
    onNotFound(res);
    return;
  }
  if (err.name === 'ValidationError') {
    onValidationError(res, err);
    return;
  }
  if (err.name === 'TypeError') {
    onValidationError(res);
    return;
  }
  if (err.message === 'Search returned null') {
    onNotFound(res);
    return;
  }
  onStandartError(res);
};

const getCards = (req, res) => {
  Card.find({})
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
  Card.create({ name, link, owner: ownerId })
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
    .orFail(() => {
      throw new Error('Search returned null');
    })
    .then(() => {
      res.status(200).send({ message: 'Карточка удалена' });
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
    .orFail(() => {
      throw new Error('Search returned null');
    })
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
    .orFail(() => {
      throw new Error('Search returned null');
    })
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
