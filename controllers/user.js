const User = require('../models/user');

const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_DEFAULT = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(ERR_NOT_FOUND).send({ message: 'Такого пользователя не существует' });
      }
      res.status(200).send({ data: user });
    })
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: { name: user.name, about: user.about, avatar: user.avatar } });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Ошибка валидации' });
      }
      res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

const updateProfile = (req, res) => {
  const userdId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userdId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERR_NOT_FOUND).send({ message: 'Такого пользователя не существует' });
      }
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Ошибка валидации' });
      }
      res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

const updateAvatar = (req, res) => {
  const userdId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userdId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERR_NOT_FOUND).send({ message: 'Такого пользователя не существует' });
      }
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Ошибка валидации' });
      }
      res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
