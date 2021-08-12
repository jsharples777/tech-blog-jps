/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/js/db/connection.js":
/*!**********************************!*\
  !*** ./dist/js/db/connection.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


//const Sequelize = require("sequelize");
//const dotenv = require('dotenv').config();
var Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
var dotenv = __webpack_require__(/*! dotenv */ "dotenv");
dotenv.config();
// @ts-ignore
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true,
    },
});
module.exports = sequelize;


/***/ }),

/***/ "./dist/js/models/blogentry.js":
/*!*************************************!*\
  !*** ./dist/js/models/blogentry.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
var connection_1 = __importDefault(__webpack_require__(/*! ../db/connection */ "./dist/js/db/connection.js"));
var user_1 = __importDefault(__webpack_require__(/*! ./user */ "./dist/js/models/user.js"));
var BlogEntry = /** @class */ (function (_super) {
    __extends(BlogEntry, _super);
    function BlogEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BlogEntry;
}(sequelize_1.Model));
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
            model: user_1.default,
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


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
var connection_1 = __importDefault(__webpack_require__(/*! ../db/connection */ "./dist/js/db/connection.js"));
var user_1 = __importDefault(__webpack_require__(/*! ./user */ "./dist/js/models/user.js"));
var blogentry_1 = __importDefault(__webpack_require__(/*! ./blogentry */ "./dist/js/models/blogentry.js"));
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Comment;
}(sequelize_1.Model));
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
            model: user_1.default,
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var User = __webpack_require__(/*! ./user */ "./dist/js/models/user.js");
var BlogEntry = __webpack_require__(/*! ./blogentry */ "./dist/js/models/blogentry.js");
var Comment = __webpack_require__(/*! ./comment */ "./dist/js/models/comment.js");
User.hasMany(BlogEntry, { foreignKey: 'createdBy' });
User.hasMany(Comment, { foreignKey: 'createdBy' });
BlogEntry.hasMany(Comment, { foreignKey: 'commentOn', onDelete: 'cascade' });
BlogEntry.belongsTo(User, { foreignKey: 'createdBy' });
module.exports = { User: User, BlogEntry: BlogEntry, Comment: Comment };


/***/ }),

/***/ "./dist/js/models/user.js":
/*!********************************!*\
  !*** ./dist/js/models/user.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
var connection_1 = __importDefault(__webpack_require__(/*! ../db/connection */ "./dist/js/db/connection.js"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
User.init({
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
    last_login: {
        type: sequelize_1.DataTypes.DATE
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});
module.exports = User;


/***/ }),

/***/ "./dist/js/passport/passport.js":
/*!**************************************!*\
  !*** ./dist/js/passport/passport.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var bcrypt_nodejs_1 = __importDefault(__webpack_require__(/*! bcrypt-nodejs */ "bcrypt-nodejs"));
var SocketManager_1 = __importDefault(__webpack_require__(/*! ../util/SocketManager */ "./dist/js/util/SocketManager.js"));
// @ts-ignore
function setupPassport(passport, user) {
    var User = user;
    var LocalStrategy = __webpack_require__(/*! passport-local */ "passport-local").Strategy;
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
                        var message = {
                            type: "create",
                            objectType: "User",
                            data: user,
                            user: user.id
                        };
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
        done(null, user.id);
    });
    // deserialize user
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var express = __webpack_require__(/*! express */ "express");
var debug = __webpack_require__(/*! debug */ "debug")('api');
var _a = __webpack_require__(/*! ../models */ "./dist/js/models/index.js"), User = _a.User, BlogEntry = _a.BlogEntry, Comment = _a.Comment;
var moment = __webpack_require__(/*! moment */ "moment");
var socketManager = __webpack_require__(/*! ../util/SocketManager */ "./dist/js/util/SocketManager.js");
var router = express.Router();
/* Comments API -
*    comments are retrieved with the tech blog entries, but we need to supply
*    API calls for creating and deleting.
* */
router.post('/comment', function (req, res) {
    debug('Creating a Comment');
    var changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    debug(req.body);
    Comment.create(req.body)
        .then(function (comment) {
        var message = {
            type: "create",
            objectType: "Comment",
            data: comment,
            user: req.user.id,
        };
        socketManager.sendMessage(message);
        res.json(comment);
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
router.put('/comment/:id', function (req, res) {
    debug("Updating Comment with id " + req.params.id);
    var changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    debug(req.body);
    Comment.update(req.body, {
        where: { id: req.params.id }
    }).then(function (comment) {
        var message = {
            type: "update",
            objectType: "Comment",
            data: comment,
            user: req.user.id,
        };
        socketManager.sendMessage(message);
        res.json(comment);
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
router.delete('/comment/:id', function (req, res) {
    debug("Deleting Comment with id " + req.params.id);
    // find the comment first
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (comment) {
        Comment.destroy({
            where: { id: comment.id }
        }).then(function (result) {
            var message = {
                type: "delete",
                objectType: "Comment",
                data: comment,
                user: req.user.id,
            };
            socketManager.sendMessage(message);
            res.json({ result: true });
        })
            .catch(function (err) {
            debug(err);
            res.status(400).json(err);
        });
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
/*
  Tech Blog entries API - CRUD
*/
router.get('/blog', function (req, res) {
    debug('Getting all blog entries, their creators and any comments');
    BlogEntry.findAll({
        include: [User, Comment],
        order: ['id', 'changedOn']
    })
        .then(function (blog) {
        res.json(blog);
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
router.post('/blog', function (req, res) {
    debug('Creating a blog entry');
    debug(req.body);
    var changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    BlogEntry.create(req.body)
        .then(function (blog) {
        debug("Created new blog entry with id " + blog.id + " need full object now");
        BlogEntry.findOne({
            include: [User, Comment],
            where: {
                id: blog.id
            }
        })
            .then(function (blog) {
            var message = {
                type: "create",
                objectType: "BlogEntry",
                data: blog,
                user: req.user.id,
            };
            socketManager.sendMessage(message);
            res.json(blog);
        })
            .catch(function (err) {
            debug(err);
            res.status(400).json(err);
        });
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
router.put('/blog/:id', function (req, res) {
    debug("Updating blog entry with id " + req.params.id);
    debug(req.body);
    var changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    BlogEntry.update(req.body, {
        where: { id: req.params.id }
    })
        .then(function (blog) {
        debug("Updated new blog entry with id " + blog.id + " need full object now");
        BlogEntry.findOne({
            include: [User, Comment],
            where: {
                id: req.params.id
            }
        })
            .then(function (blog) {
            var message = {
                type: "update",
                objectType: "BlogEntry",
                data: blog,
                user: req.user.id,
            };
            socketManager.sendMessage(message);
            res.json(blog);
        })
            .catch(function (err) {
            debug(err);
            res.status(400).json(err);
        });
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
router.delete('/blog/:id', function (req, res) {
    debug("Deleting blog entry with id " + req.params.id);
    BlogEntry.destroy({
        where: { id: req.params.id }
    })
        .then(function (result) {
        var message = {
            type: "delete",
            objectType: "BlogEntry",
            data: { id: parseInt(req.params.id) },
            user: req.user.id,
        };
        socketManager.sendMessage(message);
        res.json({ result: true });
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
/*
  User entries API - Read only, for ids and names
*/
router.get('/users', function (req, res) {
    debug('Getting all user entries');
    User.findAll({ attributes: ['id', 'username'] })
        .then(function (users) {
        // be sure to include its associated Products
        res.json(users);
    })
        .catch(function (err) {
        debug(err);
        res.status(400).json(err);
    });
});
module.exports = router;


/***/ }),

/***/ "./dist/js/routes/auth.js":
/*!********************************!*\
  !*** ./dist/js/routes/auth.js ***!
  \********************************/
/***/ ((module) => {


module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    },
};


/***/ }),

/***/ "./dist/js/routes/index.js":
/*!*********************************!*\
  !*** ./dist/js/routes/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var express = __webpack_require__(/*! express */ "express");
var passport = __webpack_require__(/*! passport */ "passport");
var User = __webpack_require__(/*! ../models/user */ "./dist/js/models/user.js");
var debug = __webpack_require__(/*! debug */ "debug")('route');
var setupPassport = __webpack_require__(/*! ../passport/passport */ "./dist/js/passport/passport.js");
setupPassport(passport, User);
var router = express.Router();
var auth = __webpack_require__(/*! ./auth */ "./dist/js/routes/auth.js");
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { user: req.user });
});
router.get('/dashboard', auth.ensureAuthenticated, function (req, res, next) {
    res.render('index', { user: req.user });
});
router.get('/register', function (req, res) {
    res.render('register', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));
router.get('/login', function (req, res) {
    res.render('login', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/login', passport.authenticate('local-login', {
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


/***/ }),

/***/ "./dist/js/util/SocketManager.js":
/*!***************************************!*\
  !*** ./dist/js/util/SocketManager.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


//const socketDebug = require('debug')('socket');
//const {Server} = require("socket.io");
var debug = __webpack_require__(/*! debug */ "debug");
var socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
var socketDebug = debug('socket');
var SocketManager = /** @class */ (function () {
    function SocketManager() {
        this.io = null;
    }
    SocketManager.prototype.connectToServer = function (httpServer) {
        socketDebug('Connecting up to the HTTP server');
        this.io = new socket_io_1.Server(httpServer);
    };
    SocketManager.prototype.listen = function () {
        var _this = this;
        socketDebug('starting to listen for connections');
        if (this.io)
            this.io.on('connection', function (socket) {
                socketDebug('Sockets: a user connected');
                socket.on('disconnect', function () {
                    socketDebug('Sockets: user disconnected');
                });
                socket.on('message', function (msg) {
                    socketDebug("Sockets: Received message " + msg);
                    if (_this.io)
                        _this.io.emit('message', msg);
                    socketDebug("Sockets: Sending message " + msg);
                });
            });
    };
    SocketManager.prototype.sendMessage = function (message) {
        socketDebug("Sending data " + message);
        if (this.io)
            this.io.emit('data', JSON.stringify(message));
    };
    return SocketManager;
}());
var socketManager = new SocketManager();
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

/***/ "connect-session-sequelize":
/*!********************************************!*\
  !*** external "connect-session-sequelize" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("connect-session-sequelize");

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

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("http-errors");

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

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("serve-favicon");

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./dist/js/server.js ***!
  \***************************/
var __dirname = "/";

// Configuration and Logging handlers
var dotenv = __webpack_require__(/*! dotenv */ "dotenv").config();
var morgan = __webpack_require__(/*! morgan */ "morgan");
var debug = __webpack_require__(/*! debug */ "debug")('server');
var socketDebug = __webpack_require__(/*! debug */ "debug")('socket');
// HTTP handlers
var createError = __webpack_require__(/*! http-errors */ "http-errors");
var http = __webpack_require__(/*! http */ "http");
var path = __webpack_require__(/*! path */ "path");
var favicon = __webpack_require__(/*! serve-favicon */ "serve-favicon");
// Express framework and additional middleware
var express = __webpack_require__(/*! express */ "express");
var expressHandlebars = __webpack_require__(/*! express-handlebars */ "express-handlebars");
var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
var session = __webpack_require__(/*! express-session */ "express-session");
var SequelizeStore = __webpack_require__(/*! connect-session-sequelize */ "connect-session-sequelize")(session.Store);
var cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
var connectFlash = __webpack_require__(/*! connect-flash */ "connect-flash");
// Sockets
var socketManager = __webpack_require__(/*! ./util/SocketManager */ "./dist/js/util/SocketManager.js");
// Authentication middleware
var passport = __webpack_require__(/*! passport */ "passport");
var isDevelopment = (process.env.MODE === 'Development');
debug("Is development mode " + isDevelopment);
// Create and configure the express app
var app = express();
// Express view/template engine setup
debug('setting up templating engine');
app.set('views', path.join(__dirname + "/../", 'views'));
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'default',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutDir: path.join(app.get('views'), 'layouts'),
}));
debug('setting up templating engine - handlebars');
app.set('view engine', 'handlebars');
app.set('view cache', !isDevelopment); // view caching in production
debug('Installing middlewares');
debug('Sequelizing database');
// load models
var sequelize = __webpack_require__(/*! ./db/connection */ "./dist/js/db/connection.js");
var _a = __webpack_require__(/*! ./models */ "./dist/js/models/index.js"), User = _a.User, BlogEntry = _a.BlogEntry, Comment = _a.Comment;
//Sync Database
sequelize.sync().then(function () {
    debug('Database sync successful');
}).catch(function (err) {
    debug(err, "Something went wrong with the Database Update!");
});
// Express middlewares
app.use('/', express.static('./public')); // root directory of static content
app.use('/dist', express.static('./dist')); // root directory of static content
app.use(cookieParser()); // add cookie support
app.use(bodyParser.json()); // add POST JSON support
app.use(bodyParser.urlencoded({ extended: true })); // and POST URL Encoded form support
// const sessionStore = new SequelizeStore({
//     db: sequelize,
// });
app.use(session({
    secret: 'frankie',
    resave: true,
    cookie: {
        maxAge: 30 * 60 * 1000,
    },
    //store: sessionStore,
    proxy: true,
}));
//sessionStore.sync();// Add session support
app.use(connectFlash()); // flash messages
app.use(passport.initialize()); // initialise the authentication
app.use(passport.session({})); // setup authentication to use cookie/sessions
/* Are we in Development or in Production? */
debug('Setting up server side logging with Morgan');
if (isDevelopment) {
    app.use(morgan('dev')); /* log server calls with performance timing with development details */
    /* log call requests with body */
    app.use(function (request, response, next) {
        console.log("Received request for " + request.url + " with/without body");
        if (request.body)
            console.log(request.body);
        next();
    });
}
else {
    app.use(morgan('combined')); /* log server calls per standard combined Apache combined format */
}
// ensure the user is logged in with a path
debug('Installing routes');
var routes = __webpack_require__(/*! ./routes/index */ "./dist/js/routes/index.js");
// add the middleware path routing
app.use('/', routes); // add the routes to the express middleware
// add the api path routing
var apiRoutes = __webpack_require__(/*! ./routes/api */ "./dist/js/routes/api.js");
app.use('/api', apiRoutes);
// Setup authentication
debug('Setting up User model and authentication with Passport');
//load passport strategies
__webpack_require__(/*! ./passport/passport */ "./dist/js/passport/passport.js")(passport, User);
// route for the env.js file being served to the client
debug('Setting the environment variables for the browser to access');
var port = process.env.PORT || 3000;
var LOCAL_HOST_API_DEVELOPMENT = "http://localhost:" + port + "/api";
var LOCAL_HOST_API_PRODUCTION = "https://localhost:" + port + "/api";
var localhostAPIURL = LOCAL_HOST_API_DEVELOPMENT;
if (!isDevelopment)
    localhostAPIURL = LOCAL_HOST_API_PRODUCTION;
var API_SERVER_URL = process.env.API_SERVER_URL || localhostAPIURL;
var env = { serverURL: API_SERVER_URL };
app.get('/js/env.js', function (req, res) {
    var session = req.session;
    if (session.id) {
        env["id"] = session.id;
    }
    res.send("window.ENV = " + JSON.stringify(env));
});
// catch 404 and forward to error handler
debug('Setting up 404 handler');
app.use(function (req, res, next) {
    debug('404 forwarder');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
if (isDevelopment) {
    debug('Setting up DEV 500 handler');
    app.use(function (err, req, res, next) {
        debug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}
else {
    debug('Production 500 handler');
    app.use(function (err, req, res, next) {
        debug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });
}
var httpServer = http.Server(app);
// setup the sockets manager with the server
socketManager.connectToServer(httpServer);
//const io = new Server(httpServer);
//io.on('connection', (socket) => {
//    console.log('----A USER CONNECTED-----');
//});
httpServer.listen(port, function () {
    debug("Server started on port " + port);
    // start listening for socket events
    socketManager.listen();
    // socketDebug("starting socket listener");
    // io.on('connection', (socket) => {
    //     socketDebug('Sockets: a user connected');
    //     socket.on('disconnect', () => {
    //         socketDebug('Sockets: user disconnected');
    //     });
    //     socket.on('chat message', (msg) => {
    //         socketDebug("Sockets: Received message " + msg);
    //         io.emit('chat message', msg);
    //         socketDebug("Sockets: Sending message " + msg);
    //     });
    //    });
});

})();

/******/ })()
;
//# sourceMappingURL=server.bundle.js.map