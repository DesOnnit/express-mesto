const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((id) => {
      if (!id) {
        throw new NotFound('Такой карточки не сущетсвует');
      }
      res.status(200).send(id);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
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
        throw new NotFound('Такой карточки не сущетсвует');
      }
      res.status(200).send(like);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
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
        throw new NotFound('Такой карточки не сущетсвует');
      }
      res.status(201).send(like);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
