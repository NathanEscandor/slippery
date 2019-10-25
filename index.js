const mongoose = require('mongoose');
const games = require('./routes/games');
const matches = require('./routes/matches');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/slippery')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB ', err));

app.use(express.json());
app.use('/api/games', games);
app.use('/api/matches', matches);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));