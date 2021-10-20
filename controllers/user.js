const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такой страницы не сущетсвует' });
      }
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такого пользователя не сущетсвует' });
      }
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: 'Ошибка' });
      }
      res.status(201).send({ name: user.name, about: user.about, avatar: user.avatar });
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const updateProfile = (req, res) => {
  const userdId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userdId, { name, about })
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: 'Ошибка' });
      }
      res.status(201).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

const updateAvatar = (req, res) => {
  const userdId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userdId, {avatar})
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: 'Ошибка' });
      }
      res.status(201).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar
};
