const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});