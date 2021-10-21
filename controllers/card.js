const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        return res.status(400).send({ message: 'Такой страницы не сущетсвует' });
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: 'Ошибка' });
      }
      res.status(201).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((id) => {
      if (!id) {
        res.status(400).send({ message: 'Ошибка' });
      }
      res.status(200).send(id);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(400).send({ message: 'Ошибка' });
      }
      res.status(200).send(like);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(400).send({ message: 'Ошибка' });
      }
      res.status(201).send(like);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard
};
