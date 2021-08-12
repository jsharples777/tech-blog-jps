"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
var SocketManager_1 = __importDefault(require("../util/SocketManager"));
// @ts-ignore
function setupPassport(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    // Register strategy
    passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        var generateHash = function (password) {
            return bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(8));
        };
        // @ts-ignore
        User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (user) {
                return done(null, false, {
                    message: 'That username is already taken'
                });
            }
            else {
                var userPassword = generateHash(password);
                var data = {
                    username: username,
                    password: userPassword,
                };
                // @ts-ignore
                User.create(data).then(function (newUser) {
                    // @ts-ignore
                    User.findOne({
                        where: {
                            username: username
                        }
                    }).then(function (user) {
                        // @ts-ignore
                        var message = { type: "create", objectType: "User", data: user, user: user.id };
                        SocketManager_1.default.sendMessage(message);
                    });
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }));
    // Login strategy
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        var User = user;
        var isValidPassword = function (hashedPassword, password) {
            return bcrypt_nodejs_1.default.compareSync(password, hashedPassword);
        };
        // @ts-ignore
        User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'Username and/or password is incorrect'
                });
            }
            // @ts-ignore
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Username and/or password is incorrect'
                });
            }
            var userinfo = user.get();
            return done(null, userinfo);
        }).catch(function (err) {
            return done(err);
        });
    }));
    //serialize
    passport.serializeUser(function (user, done) {
        // @ts-ignore
        done(null, user.id);
    });
    // deserialize user
    passport.deserializeUser(function (id, done) {
        // @ts-ignore
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                // @ts-ignore
                done(user.errors, null);
            }
        });
    });
}
module.exports = setupPassport;
//# sourceMappingURL=passport.js.map