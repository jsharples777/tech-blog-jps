const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const debug = require('debug')('routes');
require('../passport/passport')(passport,User);

const router = express.Router();
const auth = require('./auth');

/* GET home page. */
router.get('/', auth.ensureAuthenticated, (req, res, next) => {
  res.render('index', { user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register', {});
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/',
  failureRedirect: '/register'
}));


router.get('/login', (req, res) => {
  res.render('login', { user: req.user, layout: 'login' });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login'
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
