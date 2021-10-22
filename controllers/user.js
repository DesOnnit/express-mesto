const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не сущетсвует');
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ name: user.name, about: user.about, avatar: user.avatar });
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

const updateProfile = (req, res) => {
  const userdId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userdId, { name, about })
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не сущетсвует');
      }
      res.status(201).send(user);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

const updateAvatar = (req, res) => {
  const userdId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userdId, { avatar })
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не сущетсвует');
      }
      res.status(201).send(user);
    })
    .catch(() => {
      throw new BadRequest('Что-то пошло не так');
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
