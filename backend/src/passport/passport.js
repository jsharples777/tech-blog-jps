const  bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    // Register strategy
    passport.use('local-register', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            const generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };


            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
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
        function(req, username, password, done) {

            const User = user;

            const isValidPassword = function(hashedPassword, password) {
                return bCrypt.compareSync(password, hashedPassword);
            }

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
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
            }).catch(function(err) {
                return done(err);
            });
        }
    ));

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    // deserialize user
    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}

