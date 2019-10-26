const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');

// Was originally going to call this Set and Sets, but it appears that
// "Set" is a protected variable name in JS

router.get('/', async(req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(`User with email ${req.body.email} already registered`);

  user = new User({ 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  user = await user.save();

  res.send({
    name: user.name,
    email: user.email
  });
});

// router.get('/:id', async(req, res) => {
//   const match = await Match.findById(req.params.id); //NJE: what if this fails?
//   if (!match) return;

//   res.send(match);
// });

// router.post('/', async(req, res) => {
//   const match = new Match();

//   match.name = req.body.name || match.dateCreated;
//   match.save();
//   res.send(match);
// });

// router.put('/:id', async(req, res) => {
//   let match = await Match.findById(req.params.id);
//   if (!match) return;

//   match.name = req.body.name || match.name;
//   match.tags = req.body.tags || match.tags;
//   match.games = req.body.games || match.games;
//   match.isDeleted = req.body.isDeleted || match.isDeleted;

//   const result = await match.save();
//   res.send(result);
// });

// router.post('/uploads', upload.single('slp_file'), async(req, res) => {
//   try {
//     res.send(req.file);
//   } catch (err) {
//     res.send(400);
//   }
//   const server_response = res.send(req.files);

//   const slp_game = new SlippiGame(server_response.req.file.path);
//   const slp_settings = slp_game.getSettings();
//   const slp_metadata = slp_game.getMetadata();
//   const slp_stats = slp_game.getStats();

//   let game = new Game({
//     name: req.body.name || slp_metadata.startAt,
//     settings: slp_settings,
//     metadata: slp_metadata,
//     stats: slp_stats
//   });

//   game = await game.save();
// });

module.exports = router;