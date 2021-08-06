const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const debug = require('debug')('route');
require('../passport/passport')(passport,User);

const router = express.Router();
const auth = require('./auth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { user: req.user });
});

router.get('/dashboard', auth.ensureAuthenticated, (req, res, next) => {
  res.render('index', { user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { user: req.user, error: req.flash()["error"]});
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}));


router.get('/login', (req, res) => {
  res.render('login', { user: req.user, error: req.flash()["error"]});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

router.get('/ping', (req, res) => {
  res.status(200).send('pong!');
});


router.get('/test', (req, res) => {
  console.log(`url: ${req.url}`);
  res.send('Hello World');
});

module.exports = router;
