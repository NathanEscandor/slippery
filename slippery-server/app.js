const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const app = express();

const MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
const PassportUtil = require('./modules/passport/passport.module').PassportUtil;
const GameController = require('./modules/game/game.module')().GameController;
const UserController = require('./modules/user/user.module')().UserController;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(cookieParser());

MongoDBUtil.init();
PassportUtil.init(passport);

app.use('/games', GameController);
app.use('/users', UserController);

app.post('/login', 
  passport.authenticate('login', { session: false }), 
  function (req, res) {
    const token = req.user.generateAuthToken();
    res.status(200).send(token);
    // res.redirect('/users/' + req.user._id);
  }
);

app.get('/', function (req, res) {
  var pkg = require(path.join(__dirname, 'package.json'));
  res.json({
    name: pkg.name,
    version: pkg.version,
    status: 'up'
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (err.name === 'MongoError') {
    if (err.code === 11000) {
      err.status = 409;
    }
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.json({
    message: res.locals.message,
    error: res.locals.error
  });
});

module.exports = app;