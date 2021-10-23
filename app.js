const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const NotFound = require('./errors/NotFound');

const app = express();
const { PORT = 3001 } = process.env;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '61730bd02e5a892570a7d006',
  };
  next();
});

app.use(router);
app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
