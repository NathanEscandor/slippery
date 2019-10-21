const express = require('express');
const router = express.Router();


let games = [
  {slp: "first", id: 1},
  {slp: "second", id: 2}
];

router.get('/', (req, res) => {
  res.send(games);
});

router.get('/:id', (req, res) => {
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) res.status(404).send(`Game with given id not found`);
  res.send(game);
});

router.post('/', (req, res) => {
  const game = {
    id: games.length + 1,
    name: req.body.name
  }
  games.push(game);
  res.send(game);
});