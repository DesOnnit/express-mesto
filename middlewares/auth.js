const jwt = require('jsonwebtoken');
const Auth = require('../errors/Auth');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new Auth('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = auth;
