const config = require('config');
const mongoose = require('mongoose');
const games = require('./routes/games');
const matches = require('./routes/matches');
const users = require('./routes/users');
const auth = require('./routes/auth');

const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/slippery')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB ', err));

app.use(express.json());
app.use('/api/games', games);
app.use('/api/matches', matches);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));