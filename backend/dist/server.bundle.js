/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/js/db/connection.js":
/*!**********************************!*\
  !*** ./dist/js/db/connection.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv_1.default.config();
// @ts-ignore
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true,
    },
});
module.exports = sequelize;


/***/ }),

/***/ "./dist/js/models/account.js":
/*!***********************************!*\
  !*** ./dist/js/models/account.js ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const connection_1 = __importDefault(__webpack_require__(/*! ../db/connection */ "./dist/js/db/connection.js"));
class Account extends sequelize_1.Model {
}
Account.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    username: {
        type: sequelize_1.DataTypes.TEXT
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});
module.exports = Account;


/***/ }),

/***/ "./dist/js/models/blogentry.js":
/*!*************************************!*\
  !*** ./dist/js/models/blogentry.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const connection_1 = __importDefault(__webpack_require__(/*! ../db/connection */ "./dist/js/db/connection.js"));
const account_1 = __importDefault(__webpack_require__(/*! ./account */ "./dist/js/models/account.js"));
class BlogEntry extends sequelize_1.Model {
}
BlogEntry.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: account_1.default,
            key: "id"
        }
    },
    changedOn: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogentry',
});
module.exports = BlogEntry;


/***/ }),

/***/ "./dist/js/models/comment.js":
/*!***********************************!*\
  !*** ./dist/js/models/comment.js ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const connection_1 = __importDefault(__webpack_require__(/*! ../db/connection */ "./dist/js/db/connection.js"));
const account_1 = __importDefault(__webpack_require__(/*! ./account */ "./dist/js/models/account.js"));
const blogentry_1 = __importDefault(__webpack_require__(/*! ./blogentry */ "./dist/js/models/blogentry.js"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: account_1.default,
            key: "id"
        }
    },
    commentOn: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: blogentry_1.default,
            key: "id"
        },
    },
    changedOn: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});
module.exports = Comment;


/***/ }),

/***/ "./dist/js/models/index.js":
/*!*********************************!*\
  !*** ./dist/js/models/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Comment = exports.BlogEntry = exports.Account = void 0;
const Account = __webpack_require__(/*! ./account */ "./dist/js/models/account.js");
exports.Account = Account;
const BlogEntry = __webpack_require__(/*! ./blogentry */ "./dist/js/models/blogentry.js");
exports.BlogEntry = BlogEntry;
const Comment = __webpack_require__(/*! ./comment */ "./dist/js/models/comment.js");
exports.Comment = Comment;
Account.hasMany(BlogEntry, { foreignKey: 'createdBy' });
Account.hasMany(Comment, { foreignKey: 'createdBy' });
BlogEntry.hasMany(Comment, { foreignKey: 'commentOn', onDelete: 'cascade' });
BlogEntry.belongsTo(Account, { foreignKey: 'createdBy' });


/***/ }),

/***/ "./dist/js/passport/passport.js":
/*!**************************************!*\
  !*** ./dist/js/passport/passport.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt_nodejs_1 = __importDefault(__webpack_require__(/*! bcrypt-nodejs */ "bcrypt-nodejs"));
const SocketManager_1 = __importDefault(__webpack_require__(/*! ../util/SocketManager */ "./dist/js/util/SocketManager.js"));
// @ts-ignore
function setupPassport(passport, user) {
    const User = user;
    const LocalStrategy = __webpack_require__(/*! passport-local */ "passport-local").Strategy;
    // Register strategy
    passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        const generateHash = function (password) {
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
                const userPassword = generateHash(password);
                const data = {
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
                        let message = { type: "create", objectType: "User", data: user, user: user.id };
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
        const User = user;
        const isValidPassword = function (hashedPassword, password) {
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
            const userinfo = user.get();
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


/***/ }),

/***/ "./dist/js/routes/api.js":
/*!*******************************!*\
  !*** ./dist/js/routes/api.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "debug"));
const index_1 = __webpack_require__(/*! ../models/index */ "./dist/js/models/index.js");
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const SocketManager_1 = __importDefault(__webpack_require__(/*! ../util/SocketManager */ "./dist/js/util/SocketManager.js"));
const router = express_1.default.Router();
const rDebug = debug_1.default('api');
/* Comments API -
*    comments are retrieved with the tech blog entries, but we need to supply
*    API calls for creating and deleting.
* */
router.post('/comment', (req, res) => {
    rDebug('Creating a Comment');
    const changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    rDebug(req.body);
    index_1.Comment.create(req.body)
        .then((comment) => {
        // @ts-ignore
        let message = { type: "create", objectType: "Comment", data: comment, user: req.user.id, };
        SocketManager_1.default.sendMessage(message);
        res.json(comment);
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.put('/comment/:id', (req, res) => {
    rDebug(`Updating Comment with id ${req.params.id}`);
    const changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    rDebug(req.body);
    index_1.Comment.update(req.body, {
        where: { id: req.params.id }
    }).then((comment) => {
        // @ts-ignore
        const message = { type: "update", objectType: "Comment", data: comment, user: req.user.id, };
        SocketManager_1.default.sendMessage(message);
        res.json(comment);
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.delete('/comment/:id', (req, res) => {
    rDebug(`Deleting Comment with id ${req.params.id}`);
    // find the comment first
    index_1.Comment.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((comment) => {
        // @ts-ignore
        index_1.Comment.destroy({ where: { id: comment.id }
        }).then((result) => {
            // @ts-ignore
            const message = { type: "delete", objectType: "Comment", data: comment, user: req.user.id, };
            SocketManager_1.default.sendMessage(message);
            res.json({ result: true });
        })
            .catch((err) => {
            rDebug(err);
            res.status(400).json(err);
        });
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
/*
  Tech Blog entries API - CRUD
*/
router.get('/blog', (req, res) => {
    rDebug('Getting all blog entries, their creators and any comments');
    index_1.BlogEntry.findAll({
        include: [index_1.Account, index_1.Comment],
        order: ['id', 'changedOn']
    })
        .then((blog) => {
        res.json(blog);
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.post('/blog', (req, res) => {
    rDebug('Creating a blog entry');
    rDebug(req.body);
    const changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    index_1.BlogEntry.create(req.body)
        .then((blog) => {
        // @ts-ignore
        rDebug(`Created new blog entry with id ${blog.id} need full object now`);
        // @ts-ignore
        index_1.BlogEntry.findOne({ include: [index_1.Account, index_1.Comment], where: { id: blog.id }
        })
            .then((blog) => {
            // @ts-ignore
            const message = { type: "create", objectType: "BlogEntry", data: blog, user: req.user.id, };
            SocketManager_1.default.sendMessage(message);
            res.json(blog);
        })
            .catch((err) => {
            rDebug(err);
            res.status(400).json(err);
        });
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.put('/blog/:id', (req, res) => {
    rDebug(`Updating blog entry with id ${req.params.id}`);
    rDebug(req.body);
    const changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    index_1.BlogEntry.update(req.body, {
        where: { id: req.params.id }
    })
        .then((blog) => {
        // @ts-ignore
        rDebug(`Updated new blog entry with id ${blog.id} need full object now`);
        index_1.BlogEntry.findOne({
            include: [index_1.Account, index_1.Comment],
            where: {
                id: req.params.id
            }
        })
            .then((blog) => {
            // @ts-ignore
            const message = { type: "update", objectType: "BlogEntry", data: blog, user: req.user.id, };
            SocketManager_1.default.sendMessage(message);
            res.json(blog);
        })
            .catch((err) => {
            rDebug(err);
            res.status(400).json(err);
        });
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.delete('/blog/:id', (req, res) => {
    rDebug(`Deleting blog entry with id ${req.params.id}`);
    index_1.BlogEntry.destroy({
        where: { id: req.params.id }
    })
        .then((result) => {
        // @ts-ignore
        const message = { type: "delete", objectType: "BlogEntry", data: { id: parseInt(req.params.id) }, user: req.user.id, };
        SocketManager_1.default.sendMessage(message);
        res.json({ result: true });
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
/*
  User entries API - Read only, for ids and names
*/
router.get('/users', (req, res) => {
    rDebug('Getting all user entries');
    index_1.Account.findAll({ attributes: ['id', 'username'] })
        .then((users) => {
        // be sure to include its associated Products
        res.json(users);
    })
        .catch((err) => {
        rDebug(err);
        res.status(400).json(err);
    });
});
module.exports = router;
module.exports = router;


/***/ }),

/***/ "./dist/js/routes/auth.js":
/*!********************************!*\
  !*** ./dist/js/routes/auth.js ***!
  \********************************/
/***/ ((module) => {


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
module.exports = { ensureAuthenticated, forwardAuthenticated };


/***/ }),

/***/ "./dist/js/routes/index.js":
/*!*********************************!*\
  !*** ./dist/js/routes/index.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
const account_1 = __importDefault(__webpack_require__(/*! ../models/account */ "./dist/js/models/account.js"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "debug"));
const passport_2 = __importDefault(__webpack_require__(/*! ../passport/passport */ "./dist/js/passport/passport.js"));
// @ts-ignore
passport_2.default(passport_1.default, account_1.default);
const rDebug = debug_1.default('route');
const router = express_1.default.Router();
const auth_1 = __importDefault(__webpack_require__(/*! ./auth */ "./dist/js/routes/auth.js"));
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { user: req.user });
});
router.get('/dashboard', auth_1.default.ensureAuthenticated, (req, res, next) => {
    res.render('index', { user: req.user });
});
router.get('/register', (req, res) => {
    res.render('register', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/register', passport_1.default.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));
router.get('/login', (req, res) => {
    res.render('login', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/login', passport_1.default.authenticate('local-login', {
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


/***/ }),

/***/ "./dist/js/server.js":
/*!***************************!*\
  !*** ./dist/js/server.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __dirname = "/";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Configuration and Logging handlers
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "debug"));
// HTTP handlers
const http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
// Express framework and additional middleware
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const express_handlebars_1 = __importDefault(__webpack_require__(/*! express-handlebars */ "express-handlebars"));
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const express_session_1 = __importDefault(__webpack_require__(/*! express-session */ "express-session"));
const cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ "cookie-parser"));
const connect_flash_1 = __importDefault(__webpack_require__(/*! connect-flash */ "connect-flash"));
// Sockets
const SocketManager_1 = __importDefault(__webpack_require__(/*! ./util/SocketManager */ "./dist/js/util/SocketManager.js"));
// Authentication middleware
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
//Passport and User model
const passport_2 = __importDefault(__webpack_require__(/*! ./passport/passport */ "./dist/js/passport/passport.js"));
const connection_1 = __importDefault(__webpack_require__(/*! ./db/connection */ "./dist/js/db/connection.js"));
const models_1 = __webpack_require__(/*! ./models */ "./dist/js/models/index.js");
// routes
const routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./dist/js/routes/index.js"));
const api_1 = __importDefault(__webpack_require__(/*! ./routes/api */ "./dist/js/routes/api.js"));
dotenv_1.default.config();
console.log(process.env);
const serverDebug = debug_1.default('server');
const isDevelopment = (process.env.MODE === 'Development');
serverDebug(`Is development mode ${isDevelopment}`);
// Create and configure the express app
const app = express_1.default();
// Express view/template engine setup
serverDebug('setting up templating engine');
app.set('views', path_1.default.join(`${__dirname}/../`, 'views'));
app.engine('handlebars', express_handlebars_1.default({
    defaultLayout: 'default',
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
}));
serverDebug('setting up templating engine - handlebars');
app.set('view engine', 'handlebars');
app.set('view cache', !isDevelopment); // view caching in production
serverDebug('Installing middlewares');
serverDebug('Sequelizing database');
//Sync Database
connection_1.default.sync().then(function () {
    serverDebug('Database sync successful');
}).catch(function (err) {
    serverDebug(err, "Something went wrong with the Database Update!");
});
// Express middlewares
app.use('/', express_1.default.static('./public')); // root directory of static content
app.use('/dist', express_1.default.static('./dist')); // root directory of static content
app.use(cookie_parser_1.default()); // add cookie support
app.use(body_parser_1.default.json()); // add POST JSON support
app.use(body_parser_1.default.urlencoded({ extended: true })); // and POST URL Encoded form support
app.use(express_session_1.default({
    secret: 'frankie',
    resave: true,
    cookie: {
        maxAge: 30 * 60 * 1000,
    },
    proxy: true,
}));
app.use(connect_flash_1.default()); // flash messages
app.use(passport_1.default.initialize()); // initialise the authentication
app.use(passport_1.default.session()); // setup authentication to use cookie/sessions
/* Are we in Development or in Production? */
serverDebug('Setting up server side logging with Morgan');
if (isDevelopment) {
    app.use(morgan_1.default('dev')); /* log server calls with performance timing with development details */
    /* log call requests with body */
    app.use((request, response, next) => {
        serverDebug(`Received request for ${request.url} with/without body`);
        if (request.body)
            console.log(request.body);
        next();
    });
}
else {
    app.use(morgan_1.default('combined')); /* log server calls per standard combined Apache combined format */
}
// ensure the user is logged in with a path
serverDebug('Installing routes');
app.use('/', routes_1.default); // add the middleware path routing
app.use('/api', api_1.default); // add the api path routing
// Setup authentication
serverDebug('Setting up User model and authentication with Passport');
// @ts-ignore
passport_2.default(passport_1.default, models_1.Account);
// route for the env.js file being served to the client
serverDebug('Setting the environment variables for the browser to access');
const port = process.env.PORT || 3000;
const LOCAL_HOST_API_DEVELOPMENT = `http://localhost:${port}/api`;
const LOCAL_HOST_API_PRODUCTION = `https://localhost:${port}/api`;
let localhostAPIURL = LOCAL_HOST_API_DEVELOPMENT;
if (!isDevelopment)
    localhostAPIURL = LOCAL_HOST_API_PRODUCTION;
const API_SERVER_URL = process.env.API_SERVER_URL || localhostAPIURL;
let env = { serverURL: API_SERVER_URL };
app.get('/js/env.js', (req, res) => {
    let session = req.session;
    if (session.id) {
        env.id = session.id;
    }
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});
// catch 404 and forward to error handler
serverDebug('Setting up 404 handler');
app.use((req, res, next) => {
    serverDebug('404 forwarder');
    const err = new Error('Not Found');
    // @ts-ignore
    err.status = 404;
    next(err);
});
// error handler
if (isDevelopment) {
    serverDebug('Setting up DEV 500 handler');
    // @ts-ignore
    app.use((err, req, res, next) => {
        serverDebug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}
else {
    serverDebug('Production 500 handler');
    // @ts-ignore
    app.use((err, req, res, next) => {
        serverDebug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });
}
const httpServer = new http_1.default.Server(app);
// setup the sockets manager with the server
SocketManager_1.default.connectToServer(httpServer);
httpServer.listen(port, () => {
    serverDebug(`Server started on port ${port}`);
    // start listening for socket events
    SocketManager_1.default.listen();
});


/***/ }),

/***/ "./dist/js/util/SocketManager.js":
/*!***************************************!*\
  !*** ./dist/js/util/SocketManager.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const debug = __webpack_require__(/*! debug */ "debug");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const socketDebug = debug('socket');
class SocketManager {
    constructor() {
        this.io = null;
    }
    connectToServer(httpServer) {
        socketDebug('Connecting up to the HTTP server');
        this.io = new socket_io_1.Server(httpServer);
    }
    listen() {
        socketDebug('starting to listen for connections');
        if (this.io)
            this.io.on('connection', (socket) => {
                socketDebug('Sockets: a user connected');
                socket.on('disconnect', () => {
                    socketDebug('Sockets: user disconnected');
                });
                socket.on('message', (msg) => {
                    socketDebug("Sockets: Received message " + msg);
                    if (this.io)
                        this.io.emit('message', msg);
                    socketDebug("Sockets: Sending message " + msg);
                });
            });
    }
    sendMessage(message) {
        socketDebug("Sending data " + message);
        if (this.io)
            this.io.emit('data', JSON.stringify(message));
    }
}
let socketManager = new SocketManager();
module.exports = socketManager;


/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("bcrypt-nodejs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "connect-flash":
/*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("connect-flash");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

module.exports = require("debug");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-handlebars":
/*!*************************************!*\
  !*** external "express-handlebars" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("express-handlebars");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/js/server.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.bundle.js.map