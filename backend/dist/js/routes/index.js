"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var user_1 = __importDefault(require("../models/user"));
var debug_1 = __importDefault(require("debug"));
var passport_2 = __importDefault(require("../passport/passport"));
// @ts-ignore
passport_2.default(passport_1.default, user_1.default);
var rDebug = debug_1.default('route');
var router = express_1.default.Router();
var auth_1 = __importDefault(require("./auth"));
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { user: req.user });
});
router.get('/dashboard', auth_1.default.ensureAuthenticated, function (req, res, next) {
    res.render('index', { user: req.user });
});
router.get('/register', function (req, res) {
    res.render('register', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/register', passport_1.default.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));
router.get('/login', function (req, res) {
    res.render('login', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/login', passport_1.default.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});
router.get('/ping', function (req, res) {
    res.status(200).send('pong!');
});
router.get('/test', function (req, res) {
    console.log("url: " + req.url);
    res.send('Hello World');
});
module.exports = router;
//# sourceMappingURL=index.js.map