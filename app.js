const Joi = require('joi');
const fs = require('fs');
const express = require('express');

const games = require('./routes/games');
//could use a logger like morgan
//could use helmet for security
//could use config to set different app launch packages


const app = express();
app.use('/api/games', games);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})