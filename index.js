const mongoose = require('mongoose');
const games = require('./routes/games');

const express = require('express');
const app = express();

const game_loader = require('./game-loader');

mongoose.connect('mongodb://localhost/slippery')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB ', err));


app.use(express.json());
app.use('/api/games', games);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));