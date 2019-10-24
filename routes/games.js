const router = require('express').Router();
const upload = require('multer')({dest: './uploads'});
const {Game, validate} = require('../models/game');
const { default: SlippiGame } = require('slp-parser-js');

router.get('/', async(req, res) => {
  const games = await Game.find().sort('name');
  res.send(games);
});

router.get('/:id', async(req, res) => {
  const game = await Game.findById(req.params.id); //NJE: what if this fails?
  res.send(game);
});

router.post('/uploads', upload.single('slp_file'), async(req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
  const server_response = res.send(req.files);

  const slp_game = new SlippiGame(server_response.req.file.path);
  const slp_settings = slp_game.getSettings();
  const slp_metadata = slp_game.getMetadata();
  const slp_stats = slp_game.getStats();

  let game = new Game({
    name: req.body.name || slp_metadata.startAt,
    settings: slp_settings,
    metadata: slp_metadata,
    stats: slp_stats
  });

  game = await game.save();
});

module.exports = router;