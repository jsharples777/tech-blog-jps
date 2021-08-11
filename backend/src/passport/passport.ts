// const bCrypt = require('bcrypt-nodejs');
// const socketManager = require("../util/SocketManager");
import bCrypt = require('bcrypt-nodejs');
import socketManager = require("../util/SocketManager");
import User from '../models/user';
import passport from 'passport';
import {Request} from "express";

//module.exports = function (passport, user) {
function setupPassport(passport:passport, user:User) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    // Register strategy
    passport.use('local-register', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req:Request, username:string, password:string, done:any) {
            const generateHash = function (password:string):string {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
            };



            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user:User) {
                if (user) {
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                } else {
                    const userPassword = generateHash(password);
                    const data =
                        {
                            username: username,
                            password: userPassword,
                        };

                    User.create(data).then(function (newUser, created) {
                        User.findOne({
                            where: {
                                username: username
                            }
                        }).then(function (user:User) {
                            let message = {
                                type: "create",
                                objectType: "User",
                                data: user,
                                user: user.id
                            }
                            socketManager.sendMessage(message);

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
        }
    ));

    // Login strategy
    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req:Request, username:string, password:string, done:any) {

            const User = user;

            const isValidPassword = function(hashedPassword:string, password:string):boolean {
                return bCrypt.compareSync(password, hashedPassword);
            }

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user:User) {
                if (!user) {
                    return done(null, false, {
                        message: 'Username and/or password is incorrect'
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Username and/or password is incorrect'
                    });
                }

                const userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err:Error) {
                return done(err);
            });
        }
    ));

    //serialize
    passport.serializeUser(function(user:User, done:any) {
        done(null, user.id);
    });


    // deserialize user
    passport.deserializeUser(function(id:number, done:any) {
        User.findByPk(id).then(function(user:User) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}

export = setupPassport;