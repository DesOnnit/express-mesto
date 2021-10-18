const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такой страницы не сущетсвует' });
      }
      return res.status(200).send({data: user});
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такого пользователя не сущетсвует' });
      }
      return res.status(200).send({data: user});
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'Ошибка' });
      }
      return res.status(201).send({ data: { name: user.name, about: user.about, avatar: user.avatar } });
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
