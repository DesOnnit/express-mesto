const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { userValidation, loginValidation } = require('./middlewares/validation');

const app = express();
const { PORT = 3001 } = process.env;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use(auth, router);
app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});
app.use(errors);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    });
  next();
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
