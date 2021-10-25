const Card = require('../models/card');

const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_DEFAULT = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Ошибка валидации' });
      } else if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((id) => {
      if (!id) {
        res.status(ERR_NOT_FOUND).send({ message: 'Такого пользователя не существует' });
      }
      res.status(200).send(id);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(ERR_NOT_FOUND).send({ message: 'Такого пользователя не существует' });
      }
      res.status(200).send(like);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(ERR_NOT_FOUND).send({ message: 'Такого пользователя не существует' });
      }
      res.status(201).send(like);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
