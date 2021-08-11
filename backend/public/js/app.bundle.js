/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/js/db/connection.js":
/*!**********************************!*\
  !*** ./dist/js/db/connection.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Sequelize = __webpack_require__(/*! sequelize */ \"./node_modules/sequelize/index.js\");\n\nvar dotenv = __webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\").config();\n\nvar sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {\n  host: process.env.DB_HOST,\n  dialect: 'mysql',\n  dialectOptions: {\n    decimalNumbers: true\n  }\n});\nmodule.exports = sequelize;\n\n//# sourceURL=webpack://backend/./dist/js/db/connection.js?");

/***/ }),

/***/ "./dist/js/models/blogentry.js":
/*!*************************************!*\
  !*** ./dist/js/models/blogentry.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! sequelize */ \"./node_modules/sequelize/index.js\"),\n    Sequelize = _require.Sequelize;\n\nvar sequelize = __webpack_require__(/*! ../db/connection.js */ \"./dist/js/db/connection.js\");\n\nvar User = __webpack_require__(/*! ./user */ \"./dist/js/models/user.js\");\n\nvar BlogEntry = sequelize.define('BlogEntry', {\n  id: {\n    autoIncrement: true,\n    primaryKey: true,\n    type: Sequelize.INTEGER\n  },\n  title: {\n    type: Sequelize.STRING,\n    allowNull: false\n  },\n  content: {\n    type: Sequelize.STRING\n  },\n  createdBy: {\n    type: Sequelize.INTEGER,\n    references: {\n      model: User,\n      key: \"id\"\n    }\n  },\n  changedOn: {\n    type: Sequelize.BIGINT,\n    allowNull: false\n  }\n}, {\n  sequelize: sequelize,\n  timestamps: false,\n  freezeTableName: true,\n  underscored: true,\n  modelName: 'blogentry'\n});\nmodule.exports = BlogEntry;\n\n//# sourceURL=webpack://backend/./dist/js/models/blogentry.js?");

/***/ }),

/***/ "./dist/js/models/comment.js":
/*!***********************************!*\
  !*** ./dist/js/models/comment.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! sequelize */ \"./node_modules/sequelize/index.js\"),\n    Sequelize = _require.Sequelize;\n\nvar sequelize = __webpack_require__(/*! ../db/connection.js */ \"./dist/js/db/connection.js\");\n\nvar User = __webpack_require__(/*! ./user */ \"./dist/js/models/user.js\");\n\nvar BlogEntry = __webpack_require__(/*! ./blogentry */ \"./dist/js/models/blogentry.js\");\n\nvar Comment = sequelize.define('Comment', {\n  id: {\n    autoIncrement: true,\n    primaryKey: true,\n    type: Sequelize.INTEGER\n  },\n  content: {\n    type: Sequelize.STRING\n  },\n  createdBy: {\n    type: Sequelize.INTEGER,\n    references: {\n      model: User,\n      key: \"id\"\n    }\n  },\n  commentOn: {\n    type: Sequelize.INTEGER,\n    references: {\n      model: BlogEntry,\n      key: \"id\"\n    }\n  },\n  changedOn: {\n    type: Sequelize.BIGINT,\n    allowNull: false\n  }\n}, {\n  sequelize: sequelize,\n  timestamps: false,\n  freezeTableName: true,\n  underscored: true,\n  modelName: 'comment'\n});\nmodule.exports = Comment;\n\n//# sourceURL=webpack://backend/./dist/js/models/comment.js?");

/***/ }),

/***/ "./dist/js/models/index.js":
/*!*********************************!*\
  !*** ./dist/js/models/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var User = __webpack_require__(/*! ./user */ \"./dist/js/models/user.js\");\n\nvar BlogEntry = __webpack_require__(/*! ./blogentry */ \"./dist/js/models/blogentry.js\");\n\nvar Comment = __webpack_require__(/*! ./comment */ \"./dist/js/models/comment.js\");\n\nUser.hasMany(BlogEntry, {\n  foreignKey: 'createdBy'\n});\nUser.hasMany(Comment, {\n  foreignKey: 'createdBy'\n});\nBlogEntry.hasMany(Comment, {\n  foreignKey: 'commentOn',\n  onDelete: 'cascade'\n});\nBlogEntry.belongsTo(User, {\n  foreignKey: 'createdBy'\n});\nmodule.exports = {\n  User: User,\n  BlogEntry: BlogEntry,\n  Comment: Comment\n};\n\n//# sourceURL=webpack://backend/./dist/js/models/index.js?");

/***/ }),

/***/ "./dist/js/models/user.js":
/*!********************************!*\
  !*** ./dist/js/models/user.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval(" // const {Sequelize} = require('sequelize');\n// const sequelize = require('../db/connection.js');\n\nvar Sequelize = __webpack_require__(/*! sequelize */ \"./node_modules/sequelize/index.js\");\n\nvar sequelize = __webpack_require__(/*! ../db/connection.js */ \"./dist/js/db/connection.js\");\n\nvar User = sequelize.define('User', {\n  id: {\n    autoIncrement: true,\n    primaryKey: true,\n    type: Sequelize.INTEGER\n  },\n  username: {\n    type: Sequelize.TEXT\n  },\n  password: {\n    type: Sequelize.STRING,\n    allowNull: false\n  },\n  last_login: {\n    type: Sequelize.DATE\n  },\n  status: {\n    type: Sequelize.ENUM('active', 'inactive'),\n    defaultValue: 'active'\n  }\n}, {\n  sequelize: sequelize,\n  timestamps: false,\n  freezeTableName: true,\n  underscored: true,\n  modelName: 'user'\n});\nmodule.exports = User;\n\n//# sourceURL=webpack://backend/./dist/js/models/user.js?");

/***/ }),

/***/ "./dist/js/passport/passport.js":
/*!**************************************!*\
  !*** ./dist/js/passport/passport.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bCrypt = __webpack_require__(/*! bcrypt-nodejs */ \"./node_modules/bcrypt-nodejs/bCrypt.js\");\n\nvar socketManager = __webpack_require__(/*! ../util/SocketManager */ \"./dist/js/util/SocketManager.js\");\n\nmodule.exports = function (passport, user) {\n  var User = user;\n\n  var LocalStrategy = __webpack_require__(/*! passport-local */ \"./node_modules/passport-local/lib/index.js\").Strategy; // Register strategy\n\n\n  passport.use('local-register', new LocalStrategy({\n    usernameField: 'username',\n    passwordField: 'password',\n    passReqToCallback: true // allows us to pass back the entire request to the callback\n\n  }, function (req, username, password, done) {\n    var generateHash = function generateHash(password) {\n      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);\n    };\n\n    User.findOne({\n      where: {\n        username: username\n      }\n    }).then(function (user) {\n      if (user) {\n        return done(null, false, {\n          message: 'That username is already taken'\n        });\n      } else {\n        var userPassword = generateHash(password);\n        var data = {\n          username: username,\n          password: userPassword\n        };\n        User.create(data).then(function (newUser, created) {\n          User.findOne({\n            where: {\n              username: username\n            }\n          }).then(function (user) {\n            var message = {\n              type: \"create\",\n              objectType: \"User\",\n              data: user,\n              user: user.id\n            };\n            socketManager.sendMessage(message);\n          });\n\n          if (!newUser) {\n            return done(null, false);\n          }\n\n          if (newUser) {\n            return done(null, newUser);\n          }\n        });\n      }\n    });\n  })); // Login strategy\n\n  passport.use('local-login', new LocalStrategy({\n    usernameField: 'username',\n    passwordField: 'password',\n    passReqToCallback: true // allows us to pass back the entire request to the callback\n\n  }, function (req, username, password, done) {\n    var User = user;\n\n    var isValidPassword = function isValidPassword(hashedPassword, password) {\n      return bCrypt.compareSync(password, hashedPassword);\n    };\n\n    User.findOne({\n      where: {\n        username: username\n      }\n    }).then(function (user) {\n      if (!user) {\n        return done(null, false, {\n          message: 'Username and/or password is incorrect'\n        });\n      }\n\n      if (!isValidPassword(user.password, password)) {\n        return done(null, false, {\n          message: 'Username and/or password is incorrect'\n        });\n      }\n\n      var userinfo = user.get();\n      return done(null, userinfo);\n    }).catch(function (err) {\n      return done(err);\n    });\n  })); //serialize\n\n  passport.serializeUser(function (user, done) {\n    done(null, user.id);\n  }); // deserialize user\n\n  passport.deserializeUser(function (id, done) {\n    User.findByPk(id).then(function (user) {\n      if (user) {\n        done(null, user.get());\n      } else {\n        done(user.errors, null);\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack://backend/./dist/js/passport/passport.js?");

/***/ }),

/***/ "./dist/js/routes/api.js":
/*!*******************************!*\
  !*** ./dist/js/routes/api.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"./node_modules/express/index.js\");\n\nvar debug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('api');\n\nvar _a = __webpack_require__(/*! ../models */ \"./dist/js/models/index.js\"),\n    User = _a.User,\n    BlogEntry = _a.BlogEntry,\n    Comment = _a.Comment;\n\nvar moment = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n\nvar socketManager = __webpack_require__(/*! ../util/SocketManager */ \"./dist/js/util/SocketManager.js\");\n\nvar router = express.Router();\n/* Comments API -\n*    comments are retrieved with the tech blog entries, but we need to supply\n*    API calls for creating and deleting.\n* */\n\nrouter.post('/comment', function (req, res) {\n  debug('Creating a Comment');\n  var changedOn = parseInt(moment().format(\"YYYYMMDDHHmmss\"));\n  req.body[\"changedOn\"] = changedOn;\n  debug(req.body);\n  Comment.create(req.body).then(function (comment) {\n    var message = {\n      type: \"create\",\n      objectType: \"Comment\",\n      data: comment,\n      user: req.user.id\n    };\n    socketManager.sendMessage(message);\n    res.json(comment);\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\nrouter.put('/comment/:id', function (req, res) {\n  debug(\"Updating Comment with id \" + req.params.id);\n  var changedOn = parseInt(moment().format(\"YYYYMMDDHHmmss\"));\n  req.body[\"changedOn\"] = changedOn;\n  debug(req.body);\n  Comment.update(req.body, {\n    where: {\n      id: req.params.id\n    }\n  }).then(function (comment) {\n    var message = {\n      type: \"update\",\n      objectType: \"Comment\",\n      data: comment,\n      user: req.user.id\n    };\n    socketManager.sendMessage(message);\n    res.json(comment);\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\nrouter.delete('/comment/:id', function (req, res) {\n  debug(\"Deleting Comment with id \" + req.params.id); // find the comment first\n\n  Comment.findOne({\n    where: {\n      id: req.params.id\n    }\n  }).then(function (comment) {\n    Comment.destroy({\n      where: {\n        id: comment.id\n      }\n    }).then(function (result) {\n      var message = {\n        type: \"delete\",\n        objectType: \"Comment\",\n        data: comment,\n        user: req.user.id\n      };\n      socketManager.sendMessage(message);\n      res.json({\n        result: true\n      });\n    }).catch(function (err) {\n      debug(err);\n      res.status(400).json(err);\n    });\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\n/*\n  Tech Blog entries API - CRUD\n*/\n\nrouter.get('/blog', function (req, res) {\n  debug('Getting all blog entries, their creators and any comments');\n  BlogEntry.findAll({\n    include: [User, Comment],\n    order: ['id', 'changedOn']\n  }).then(function (blog) {\n    res.json(blog);\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\nrouter.post('/blog', function (req, res) {\n  debug('Creating a blog entry');\n  debug(req.body);\n  var changedOn = parseInt(moment().format(\"YYYYMMDDHHmmss\"));\n  req.body[\"changedOn\"] = changedOn;\n  BlogEntry.create(req.body).then(function (blog) {\n    debug(\"Created new blog entry with id \" + blog.id + \" need full object now\");\n    BlogEntry.findOne({\n      include: [User, Comment],\n      where: {\n        id: blog.id\n      }\n    }).then(function (blog) {\n      var message = {\n        type: \"create\",\n        objectType: \"BlogEntry\",\n        data: blog,\n        user: req.user.id\n      };\n      socketManager.sendMessage(message);\n      res.json(blog);\n    }).catch(function (err) {\n      debug(err);\n      res.status(400).json(err);\n    });\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\nrouter.put('/blog/:id', function (req, res) {\n  debug(\"Updating blog entry with id \" + req.params.id);\n  debug(req.body);\n  var changedOn = parseInt(moment().format(\"YYYYMMDDHHmmss\"));\n  req.body[\"changedOn\"] = changedOn;\n  BlogEntry.update(req.body, {\n    where: {\n      id: req.params.id\n    }\n  }).then(function (blog) {\n    debug(\"Updated new blog entry with id \" + blog.id + \" need full object now\");\n    BlogEntry.findOne({\n      include: [User, Comment],\n      where: {\n        id: req.params.id\n      }\n    }).then(function (blog) {\n      var message = {\n        type: \"update\",\n        objectType: \"BlogEntry\",\n        data: blog,\n        user: req.user.id\n      };\n      socketManager.sendMessage(message);\n      res.json(blog);\n    }).catch(function (err) {\n      debug(err);\n      res.status(400).json(err);\n    });\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\nrouter.delete('/blog/:id', function (req, res) {\n  debug(\"Deleting blog entry with id \" + req.params.id);\n  BlogEntry.destroy({\n    where: {\n      id: req.params.id\n    }\n  }).then(function (result) {\n    var message = {\n      type: \"delete\",\n      objectType: \"BlogEntry\",\n      data: {\n        id: parseInt(req.params.id)\n      },\n      user: req.user.id\n    };\n    socketManager.sendMessage(message);\n    res.json({\n      result: true\n    });\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\n/*\n  User entries API - Read only, for ids and names\n*/\n\nrouter.get('/users', function (req, res) {\n  debug('Getting all user entries');\n  User.findAll({\n    attributes: ['id', 'username']\n  }).then(function (users) {\n    // be sure to include its associated Products\n    res.json(users);\n  }).catch(function (err) {\n    debug(err);\n    res.status(400).json(err);\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://backend/./dist/js/routes/api.js?");

/***/ }),

/***/ "./dist/js/routes/auth.js":
/*!********************************!*\
  !*** ./dist/js/routes/auth.js ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = {\n  ensureAuthenticated: function ensureAuthenticated(req, res, next) {\n    if (req.isAuthenticated()) {\n      return next();\n    }\n\n    res.redirect('/login');\n  },\n  forwardAuthenticated: function forwardAuthenticated(req, res, next) {\n    if (!req.isAuthenticated()) {\n      return next();\n    }\n\n    res.redirect('/');\n  }\n};\n\n//# sourceURL=webpack://backend/./dist/js/routes/auth.js?");

/***/ }),

/***/ "./dist/js/routes/index.js":
/*!*********************************!*\
  !*** ./dist/js/routes/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"./node_modules/express/index.js\");\n\nvar passport = __webpack_require__(/*! passport */ \"./node_modules/passport/lib/index.js\");\n\nvar User = __webpack_require__(/*! ../models/user */ \"./dist/js/models/user.js\");\n\nvar debug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('route');\n\n__webpack_require__(/*! ../passport/passport */ \"./dist/js/passport/passport.js\")(passport, User);\n\nvar router = express.Router();\n\nvar auth = __webpack_require__(/*! ./auth */ \"./dist/js/routes/auth.js\");\n/* GET home page. */\n\n\nrouter.get('/', function (req, res, next) {\n  res.render('index', {\n    user: req.user\n  });\n});\nrouter.get('/dashboard', auth.ensureAuthenticated, function (req, res, next) {\n  res.render('index', {\n    user: req.user\n  });\n});\nrouter.get('/register', function (req, res) {\n  res.render('register', {\n    layout: \"login-register\",\n    user: req.user,\n    error: req.flash()[\"error\"]\n  });\n});\nrouter.post('/register', passport.authenticate('local-register', {\n  successRedirect: '/',\n  failureRedirect: '/register',\n  failureFlash: true\n}));\nrouter.get('/login', function (req, res) {\n  res.render('login', {\n    layout: \"login-register\",\n    user: req.user,\n    error: req.flash()[\"error\"]\n  });\n});\nrouter.post('/login', passport.authenticate('local-login', {\n  successRedirect: '/dashboard',\n  failureRedirect: '/login',\n  failureFlash: true\n}));\nrouter.get('/logout', function (req, res) {\n  req.session.destroy(function (err) {\n    res.redirect('/');\n  });\n});\nrouter.get('/ping', function (req, res) {\n  res.status(200).send('pong!');\n});\nrouter.get('/test', function (req, res) {\n  console.log(\"url: \" + req.url);\n  res.send('Hello World');\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://backend/./dist/js/routes/index.js?");

/***/ }),

/***/ "./dist/js/server.js":
/*!***************************!*\
  !*** ./dist/js/server.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("var __dirname = \"/\";\n // Configuration and Logging handlers\n\nvar dotenv = __webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\").config();\n\nvar morgan = __webpack_require__(/*! morgan */ \"./node_modules/morgan/index.js\");\n\nvar debug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('server');\n\nvar socketDebug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('socket'); // HTTP handlers\n\n\nvar createError = __webpack_require__(/*! http-errors */ \"./node_modules/http-errors/index.js\");\n\nvar http = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'http'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nvar path = __webpack_require__(/*! path */ \"./node_modules/path/path.js\");\n\nvar favicon = __webpack_require__(/*! serve-favicon */ \"./node_modules/serve-favicon/index.js\"); // Express framework and additional middleware\n\n\nvar express = __webpack_require__(/*! express */ \"./node_modules/express/index.js\");\n\nvar expressHandlebars = __webpack_require__(/*! express-handlebars */ \"./node_modules/express-handlebars/index.js\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"./node_modules/body-parser/index.js\");\n\nvar session = __webpack_require__(/*! express-session */ \"./node_modules/express-session/index.js\");\n\nvar SequelizeStore = __webpack_require__(/*! connect-session-sequelize */ \"./node_modules/connect-session-sequelize/index.js\")(session.Store);\n\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"./node_modules/cookie-parser/index.js\");\n\nvar connectFlash = __webpack_require__(/*! connect-flash */ \"./node_modules/connect-flash/lib/index.js\"); // Sockets\n\n\nvar socketManager = __webpack_require__(/*! ./util/SocketManager */ \"./dist/js/util/SocketManager.js\"); // Authentication middleware\n\n\nvar passport = __webpack_require__(/*! passport */ \"./node_modules/passport/lib/index.js\");\n\nvar isDevelopment = process.env.MODE === 'Development';\ndebug(\"Is development mode \" + isDevelopment); // Create and configure the express app\n\nvar app = express(); // Express view/template engine setup\n\ndebug('setting up templating engine');\napp.set('views', path.join(__dirname + \"/../\", 'views'));\napp.engine('handlebars', expressHandlebars({\n  defaultLayout: 'default',\n  partialsDir: path.join(app.get('views'), 'partials'),\n  layoutDir: path.join(app.get('views'), 'layouts')\n}));\ndebug('setting up templating engine - handlebars');\napp.set('view engine', 'handlebars');\napp.set('view cache', !isDevelopment); // view caching in production\n\ndebug('Installing middlewares');\ndebug('Sequelizing database'); // load models\n\nvar sequelize = __webpack_require__(/*! ./db/connection */ \"./dist/js/db/connection.js\");\n\nvar _a = __webpack_require__(/*! ./models */ \"./dist/js/models/index.js\"),\n    User = _a.User,\n    BlogEntry = _a.BlogEntry,\n    Comment = _a.Comment; //Sync Database\n\n\nsequelize.sync().then(function () {\n  debug('Database sync successful');\n}).catch(function (err) {\n  debug(err, \"Something went wrong with the Database Update!\");\n}); // Express middlewares\n\napp.use('/', express.static('./public')); // root directory of static content\n\napp.use('/dist', express.static('./dist')); // root directory of static content\n\napp.use(cookieParser()); // add cookie support\n\napp.use(bodyParser.json()); // add POST JSON support\n\napp.use(bodyParser.urlencoded({\n  extended: true\n})); // and POST URL Encoded form support\n// const sessionStore = new SequelizeStore({\n//     db: sequelize,\n// });\n\napp.use(session({\n  secret: 'frankie',\n  resave: true,\n  cookie: {\n    maxAge: 30 * 60 * 1000\n  },\n  //store: sessionStore,\n  proxy: true\n})); //sessionStore.sync();// Add session support\n\napp.use(connectFlash()); // flash messages\n\napp.use(passport.initialize()); // initialise the authentication\n\napp.use(passport.session({})); // setup authentication to use cookie/sessions\n\n/* Are we in Development or in Production? */\n\ndebug('Setting up server side logging with Morgan');\n\nif (isDevelopment) {\n  app.use(morgan('dev'));\n  /* log server calls with performance timing with development details */\n\n  /* log call requests with body */\n\n  app.use(function (request, response, next) {\n    console.log(\"Received request for \" + request.url + \" with/without body\");\n    if (request.body) console.log(request.body);\n    next();\n  });\n} else {\n  app.use(morgan('combined'));\n  /* log server calls per standard combined Apache combined format */\n} // ensure the user is logged in with a path\n\n\ndebug('Installing routes');\n\nvar routes = __webpack_require__(/*! ./routes/index.js */ \"./dist/js/routes/index.js\"); // add the middleware path routing\n\n\napp.use('/', routes); // add the routes to the express middleware\n// add the api path routing\n\nvar apiRoutes = __webpack_require__(/*! ./routes/api */ \"./dist/js/routes/api.js\");\n\napp.use('/api', apiRoutes); // Setup authentication\n\ndebug('Setting up User model and authentication with Passport'); //load passport strategies\n\n__webpack_require__(/*! ./passport/passport.js */ \"./dist/js/passport/passport.js\")(passport, User); // route for the env.js file being served to the client\n\n\ndebug('Setting the environment variables for the browser to access');\nvar port = process.env.PORT || 3000;\nvar LOCAL_HOST_API_DEVELOPMENT = \"http://localhost:\" + port + \"/api\";\nvar LOCAL_HOST_API_PRODUCTION = \"https://localhost:\" + port + \"/api\";\nvar localhostAPIURL = LOCAL_HOST_API_DEVELOPMENT;\nif (!isDevelopment) localhostAPIURL = LOCAL_HOST_API_PRODUCTION;\nvar API_SERVER_URL = process.env.API_SERVER_URL || localhostAPIURL;\nvar env = {\n  serverURL: API_SERVER_URL\n};\napp.get('/js/env.js', function (req, res) {\n  var session = req.session;\n\n  if (session.id) {\n    env[\"id\"] = session.id;\n  }\n\n  res.send(\"window.ENV = \" + JSON.stringify(env));\n}); // catch 404 and forward to error handler\n\ndebug('Setting up 404 handler');\napp.use(function (req, res, next) {\n  debug('404 forwarder');\n  var err = new Error('Not Found');\n  err.status = 404;\n  next(err);\n}); // error handler\n\nif (isDevelopment) {\n  debug('Setting up DEV 500 handler');\n  app.use(function (err, req, res, next) {\n    debug(err);\n    res.status(err.status || 500);\n    res.render('error', {\n      message: err.message,\n      error: err\n    });\n  });\n} else {\n  debug('Production 500 handler');\n  app.use(function (err, req, res, next) {\n    debug(err);\n    res.status(err.status || 500);\n    res.render('error', {\n      message: err.message,\n      error: {}\n    });\n  });\n}\n\nvar httpServer = http.Server(app); // setup the sockets manager with the server\n\nsocketManager.connectToServer(httpServer); //const io = new Server(httpServer);\n//io.on('connection', (socket) => {\n//    console.log('----A USER CONNECTED-----');\n//});\n\nhttpServer.listen(port, function () {\n  debug(\"Server started on port \" + port); // start listening for socket events\n\n  socketManager.listen(); // socketDebug(\"starting socket listener\");\n  // io.on('connection', (socket) => {\n  //     socketDebug('Sockets: a user connected');\n  //     socket.on('disconnect', () => {\n  //         socketDebug('Sockets: user disconnected');\n  //     });\n  //     socket.on('chat message', (msg) => {\n  //         socketDebug(\"Sockets: Received message \" + msg);\n  //         io.emit('chat message', msg);\n  //         socketDebug(\"Sockets: Sending message \" + msg);\n  //     });\n  //    });\n});\n\n//# sourceURL=webpack://backend/./dist/js/server.js?");

/***/ }),

/***/ "./dist/js/util/SocketManager.js":
/*!***************************************!*\
  !*** ./dist/js/util/SocketManager.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar socketDebug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('socket');\n\nvar Server = __webpack_require__(/*! socket.io */ \"./node_modules/socket.io/dist/index.js\").Server;\n\nvar SocketManager = function () {\n  function SocketManager() {}\n\n  SocketManager.prototype.connectToServer = function (httpServer) {\n    socketDebug('Connecting up to the HTTP server');\n    this.io = new Server(httpServer);\n  };\n\n  SocketManager.prototype.listen = function () {\n    var _this = this;\n\n    socketDebug('starting to listen for connections');\n    this.io.on('connection', function (socket) {\n      socketDebug('Sockets: a user connected');\n      socket.on('disconnect', function () {\n        socketDebug('Sockets: user disconnected');\n      });\n      socket.on('message', function (msg) {\n        socketDebug(\"Sockets: Received message \" + msg);\n\n        _this.io.emit('message', msg);\n\n        socketDebug(\"Sockets: Sending message \" + msg);\n      });\n    });\n  };\n\n  SocketManager.prototype.sendMessage = function (message) {\n    socketDebug(\"Sending data \" + message);\n    this.io.emit('data', JSON.stringify(message));\n  };\n\n  return SocketManager;\n}();\n\nvar socketManager = new SocketManager();\nmodule.exports = socketManager;\n\n//# sourceURL=webpack://backend/./dist/js/util/SocketManager.js?");

/***/ }),

/***/ "./node_modules/express/lib sync recursive":
/*!****************************************!*\
  !*** ./node_modules/express/lib/ sync ***!
  \****************************************/
/***/ ((module) => {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = () => ([]);\nwebpackEmptyContext.resolve = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/express/lib sync recursive\";\nmodule.exports = webpackEmptyContext;\n\n//# sourceURL=webpack://backend/./node_modules/express/lib/_sync?");

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./af\": \"./node_modules/moment/locale/af.js\",\n\t\"./af.js\": \"./node_modules/moment/locale/af.js\",\n\t\"./ar\": \"./node_modules/moment/locale/ar.js\",\n\t\"./ar-dz\": \"./node_modules/moment/locale/ar-dz.js\",\n\t\"./ar-dz.js\": \"./node_modules/moment/locale/ar-dz.js\",\n\t\"./ar-kw\": \"./node_modules/moment/locale/ar-kw.js\",\n\t\"./ar-kw.js\": \"./node_modules/moment/locale/ar-kw.js\",\n\t\"./ar-ly\": \"./node_modules/moment/locale/ar-ly.js\",\n\t\"./ar-ly.js\": \"./node_modules/moment/locale/ar-ly.js\",\n\t\"./ar-ma\": \"./node_modules/moment/locale/ar-ma.js\",\n\t\"./ar-ma.js\": \"./node_modules/moment/locale/ar-ma.js\",\n\t\"./ar-sa\": \"./node_modules/moment/locale/ar-sa.js\",\n\t\"./ar-sa.js\": \"./node_modules/moment/locale/ar-sa.js\",\n\t\"./ar-tn\": \"./node_modules/moment/locale/ar-tn.js\",\n\t\"./ar-tn.js\": \"./node_modules/moment/locale/ar-tn.js\",\n\t\"./ar.js\": \"./node_modules/moment/locale/ar.js\",\n\t\"./az\": \"./node_modules/moment/locale/az.js\",\n\t\"./az.js\": \"./node_modules/moment/locale/az.js\",\n\t\"./be\": \"./node_modules/moment/locale/be.js\",\n\t\"./be.js\": \"./node_modules/moment/locale/be.js\",\n\t\"./bg\": \"./node_modules/moment/locale/bg.js\",\n\t\"./bg.js\": \"./node_modules/moment/locale/bg.js\",\n\t\"./bm\": \"./node_modules/moment/locale/bm.js\",\n\t\"./bm.js\": \"./node_modules/moment/locale/bm.js\",\n\t\"./bn\": \"./node_modules/moment/locale/bn.js\",\n\t\"./bn-bd\": \"./node_modules/moment/locale/bn-bd.js\",\n\t\"./bn-bd.js\": \"./node_modules/moment/locale/bn-bd.js\",\n\t\"./bn.js\": \"./node_modules/moment/locale/bn.js\",\n\t\"./bo\": \"./node_modules/moment/locale/bo.js\",\n\t\"./bo.js\": \"./node_modules/moment/locale/bo.js\",\n\t\"./br\": \"./node_modules/moment/locale/br.js\",\n\t\"./br.js\": \"./node_modules/moment/locale/br.js\",\n\t\"./bs\": \"./node_modules/moment/locale/bs.js\",\n\t\"./bs.js\": \"./node_modules/moment/locale/bs.js\",\n\t\"./ca\": \"./node_modules/moment/locale/ca.js\",\n\t\"./ca.js\": \"./node_modules/moment/locale/ca.js\",\n\t\"./cs\": \"./node_modules/moment/locale/cs.js\",\n\t\"./cs.js\": \"./node_modules/moment/locale/cs.js\",\n\t\"./cv\": \"./node_modules/moment/locale/cv.js\",\n\t\"./cv.js\": \"./node_modules/moment/locale/cv.js\",\n\t\"./cy\": \"./node_modules/moment/locale/cy.js\",\n\t\"./cy.js\": \"./node_modules/moment/locale/cy.js\",\n\t\"./da\": \"./node_modules/moment/locale/da.js\",\n\t\"./da.js\": \"./node_modules/moment/locale/da.js\",\n\t\"./de\": \"./node_modules/moment/locale/de.js\",\n\t\"./de-at\": \"./node_modules/moment/locale/de-at.js\",\n\t\"./de-at.js\": \"./node_modules/moment/locale/de-at.js\",\n\t\"./de-ch\": \"./node_modules/moment/locale/de-ch.js\",\n\t\"./de-ch.js\": \"./node_modules/moment/locale/de-ch.js\",\n\t\"./de.js\": \"./node_modules/moment/locale/de.js\",\n\t\"./dv\": \"./node_modules/moment/locale/dv.js\",\n\t\"./dv.js\": \"./node_modules/moment/locale/dv.js\",\n\t\"./el\": \"./node_modules/moment/locale/el.js\",\n\t\"./el.js\": \"./node_modules/moment/locale/el.js\",\n\t\"./en-au\": \"./node_modules/moment/locale/en-au.js\",\n\t\"./en-au.js\": \"./node_modules/moment/locale/en-au.js\",\n\t\"./en-ca\": \"./node_modules/moment/locale/en-ca.js\",\n\t\"./en-ca.js\": \"./node_modules/moment/locale/en-ca.js\",\n\t\"./en-gb\": \"./node_modules/moment/locale/en-gb.js\",\n\t\"./en-gb.js\": \"./node_modules/moment/locale/en-gb.js\",\n\t\"./en-ie\": \"./node_modules/moment/locale/en-ie.js\",\n\t\"./en-ie.js\": \"./node_modules/moment/locale/en-ie.js\",\n\t\"./en-il\": \"./node_modules/moment/locale/en-il.js\",\n\t\"./en-il.js\": \"./node_modules/moment/locale/en-il.js\",\n\t\"./en-in\": \"./node_modules/moment/locale/en-in.js\",\n\t\"./en-in.js\": \"./node_modules/moment/locale/en-in.js\",\n\t\"./en-nz\": \"./node_modules/moment/locale/en-nz.js\",\n\t\"./en-nz.js\": \"./node_modules/moment/locale/en-nz.js\",\n\t\"./en-sg\": \"./node_modules/moment/locale/en-sg.js\",\n\t\"./en-sg.js\": \"./node_modules/moment/locale/en-sg.js\",\n\t\"./eo\": \"./node_modules/moment/locale/eo.js\",\n\t\"./eo.js\": \"./node_modules/moment/locale/eo.js\",\n\t\"./es\": \"./node_modules/moment/locale/es.js\",\n\t\"./es-do\": \"./node_modules/moment/locale/es-do.js\",\n\t\"./es-do.js\": \"./node_modules/moment/locale/es-do.js\",\n\t\"./es-mx\": \"./node_modules/moment/locale/es-mx.js\",\n\t\"./es-mx.js\": \"./node_modules/moment/locale/es-mx.js\",\n\t\"./es-us\": \"./node_modules/moment/locale/es-us.js\",\n\t\"./es-us.js\": \"./node_modules/moment/locale/es-us.js\",\n\t\"./es.js\": \"./node_modules/moment/locale/es.js\",\n\t\"./et\": \"./node_modules/moment/locale/et.js\",\n\t\"./et.js\": \"./node_modules/moment/locale/et.js\",\n\t\"./eu\": \"./node_modules/moment/locale/eu.js\",\n\t\"./eu.js\": \"./node_modules/moment/locale/eu.js\",\n\t\"./fa\": \"./node_modules/moment/locale/fa.js\",\n\t\"./fa.js\": \"./node_modules/moment/locale/fa.js\",\n\t\"./fi\": \"./node_modules/moment/locale/fi.js\",\n\t\"./fi.js\": \"./node_modules/moment/locale/fi.js\",\n\t\"./fil\": \"./node_modules/moment/locale/fil.js\",\n\t\"./fil.js\": \"./node_modules/moment/locale/fil.js\",\n\t\"./fo\": \"./node_modules/moment/locale/fo.js\",\n\t\"./fo.js\": \"./node_modules/moment/locale/fo.js\",\n\t\"./fr\": \"./node_modules/moment/locale/fr.js\",\n\t\"./fr-ca\": \"./node_modules/moment/locale/fr-ca.js\",\n\t\"./fr-ca.js\": \"./node_modules/moment/locale/fr-ca.js\",\n\t\"./fr-ch\": \"./node_modules/moment/locale/fr-ch.js\",\n\t\"./fr-ch.js\": \"./node_modules/moment/locale/fr-ch.js\",\n\t\"./fr.js\": \"./node_modules/moment/locale/fr.js\",\n\t\"./fy\": \"./node_modules/moment/locale/fy.js\",\n\t\"./fy.js\": \"./node_modules/moment/locale/fy.js\",\n\t\"./ga\": \"./node_modules/moment/locale/ga.js\",\n\t\"./ga.js\": \"./node_modules/moment/locale/ga.js\",\n\t\"./gd\": \"./node_modules/moment/locale/gd.js\",\n\t\"./gd.js\": \"./node_modules/moment/locale/gd.js\",\n\t\"./gl\": \"./node_modules/moment/locale/gl.js\",\n\t\"./gl.js\": \"./node_modules/moment/locale/gl.js\",\n\t\"./gom-deva\": \"./node_modules/moment/locale/gom-deva.js\",\n\t\"./gom-deva.js\": \"./node_modules/moment/locale/gom-deva.js\",\n\t\"./gom-latn\": \"./node_modules/moment/locale/gom-latn.js\",\n\t\"./gom-latn.js\": \"./node_modules/moment/locale/gom-latn.js\",\n\t\"./gu\": \"./node_modules/moment/locale/gu.js\",\n\t\"./gu.js\": \"./node_modules/moment/locale/gu.js\",\n\t\"./he\": \"./node_modules/moment/locale/he.js\",\n\t\"./he.js\": \"./node_modules/moment/locale/he.js\",\n\t\"./hi\": \"./node_modules/moment/locale/hi.js\",\n\t\"./hi.js\": \"./node_modules/moment/locale/hi.js\",\n\t\"./hr\": \"./node_modules/moment/locale/hr.js\",\n\t\"./hr.js\": \"./node_modules/moment/locale/hr.js\",\n\t\"./hu\": \"./node_modules/moment/locale/hu.js\",\n\t\"./hu.js\": \"./node_modules/moment/locale/hu.js\",\n\t\"./hy-am\": \"./node_modules/moment/locale/hy-am.js\",\n\t\"./hy-am.js\": \"./node_modules/moment/locale/hy-am.js\",\n\t\"./id\": \"./node_modules/moment/locale/id.js\",\n\t\"./id.js\": \"./node_modules/moment/locale/id.js\",\n\t\"./is\": \"./node_modules/moment/locale/is.js\",\n\t\"./is.js\": \"./node_modules/moment/locale/is.js\",\n\t\"./it\": \"./node_modules/moment/locale/it.js\",\n\t\"./it-ch\": \"./node_modules/moment/locale/it-ch.js\",\n\t\"./it-ch.js\": \"./node_modules/moment/locale/it-ch.js\",\n\t\"./it.js\": \"./node_modules/moment/locale/it.js\",\n\t\"./ja\": \"./node_modules/moment/locale/ja.js\",\n\t\"./ja.js\": \"./node_modules/moment/locale/ja.js\",\n\t\"./jv\": \"./node_modules/moment/locale/jv.js\",\n\t\"./jv.js\": \"./node_modules/moment/locale/jv.js\",\n\t\"./ka\": \"./node_modules/moment/locale/ka.js\",\n\t\"./ka.js\": \"./node_modules/moment/locale/ka.js\",\n\t\"./kk\": \"./node_modules/moment/locale/kk.js\",\n\t\"./kk.js\": \"./node_modules/moment/locale/kk.js\",\n\t\"./km\": \"./node_modules/moment/locale/km.js\",\n\t\"./km.js\": \"./node_modules/moment/locale/km.js\",\n\t\"./kn\": \"./node_modules/moment/locale/kn.js\",\n\t\"./kn.js\": \"./node_modules/moment/locale/kn.js\",\n\t\"./ko\": \"./node_modules/moment/locale/ko.js\",\n\t\"./ko.js\": \"./node_modules/moment/locale/ko.js\",\n\t\"./ku\": \"./node_modules/moment/locale/ku.js\",\n\t\"./ku.js\": \"./node_modules/moment/locale/ku.js\",\n\t\"./ky\": \"./node_modules/moment/locale/ky.js\",\n\t\"./ky.js\": \"./node_modules/moment/locale/ky.js\",\n\t\"./lb\": \"./node_modules/moment/locale/lb.js\",\n\t\"./lb.js\": \"./node_modules/moment/locale/lb.js\",\n\t\"./lo\": \"./node_modules/moment/locale/lo.js\",\n\t\"./lo.js\": \"./node_modules/moment/locale/lo.js\",\n\t\"./lt\": \"./node_modules/moment/locale/lt.js\",\n\t\"./lt.js\": \"./node_modules/moment/locale/lt.js\",\n\t\"./lv\": \"./node_modules/moment/locale/lv.js\",\n\t\"./lv.js\": \"./node_modules/moment/locale/lv.js\",\n\t\"./me\": \"./node_modules/moment/locale/me.js\",\n\t\"./me.js\": \"./node_modules/moment/locale/me.js\",\n\t\"./mi\": \"./node_modules/moment/locale/mi.js\",\n\t\"./mi.js\": \"./node_modules/moment/locale/mi.js\",\n\t\"./mk\": \"./node_modules/moment/locale/mk.js\",\n\t\"./mk.js\": \"./node_modules/moment/locale/mk.js\",\n\t\"./ml\": \"./node_modules/moment/locale/ml.js\",\n\t\"./ml.js\": \"./node_modules/moment/locale/ml.js\",\n\t\"./mn\": \"./node_modules/moment/locale/mn.js\",\n\t\"./mn.js\": \"./node_modules/moment/locale/mn.js\",\n\t\"./mr\": \"./node_modules/moment/locale/mr.js\",\n\t\"./mr.js\": \"./node_modules/moment/locale/mr.js\",\n\t\"./ms\": \"./node_modules/moment/locale/ms.js\",\n\t\"./ms-my\": \"./node_modules/moment/locale/ms-my.js\",\n\t\"./ms-my.js\": \"./node_modules/moment/locale/ms-my.js\",\n\t\"./ms.js\": \"./node_modules/moment/locale/ms.js\",\n\t\"./mt\": \"./node_modules/moment/locale/mt.js\",\n\t\"./mt.js\": \"./node_modules/moment/locale/mt.js\",\n\t\"./my\": \"./node_modules/moment/locale/my.js\",\n\t\"./my.js\": \"./node_modules/moment/locale/my.js\",\n\t\"./nb\": \"./node_modules/moment/locale/nb.js\",\n\t\"./nb.js\": \"./node_modules/moment/locale/nb.js\",\n\t\"./ne\": \"./node_modules/moment/locale/ne.js\",\n\t\"./ne.js\": \"./node_modules/moment/locale/ne.js\",\n\t\"./nl\": \"./node_modules/moment/locale/nl.js\",\n\t\"./nl-be\": \"./node_modules/moment/locale/nl-be.js\",\n\t\"./nl-be.js\": \"./node_modules/moment/locale/nl-be.js\",\n\t\"./nl.js\": \"./node_modules/moment/locale/nl.js\",\n\t\"./nn\": \"./node_modules/moment/locale/nn.js\",\n\t\"./nn.js\": \"./node_modules/moment/locale/nn.js\",\n\t\"./oc-lnc\": \"./node_modules/moment/locale/oc-lnc.js\",\n\t\"./oc-lnc.js\": \"./node_modules/moment/locale/oc-lnc.js\",\n\t\"./pa-in\": \"./node_modules/moment/locale/pa-in.js\",\n\t\"./pa-in.js\": \"./node_modules/moment/locale/pa-in.js\",\n\t\"./pl\": \"./node_modules/moment/locale/pl.js\",\n\t\"./pl.js\": \"./node_modules/moment/locale/pl.js\",\n\t\"./pt\": \"./node_modules/moment/locale/pt.js\",\n\t\"./pt-br\": \"./node_modules/moment/locale/pt-br.js\",\n\t\"./pt-br.js\": \"./node_modules/moment/locale/pt-br.js\",\n\t\"./pt.js\": \"./node_modules/moment/locale/pt.js\",\n\t\"./ro\": \"./node_modules/moment/locale/ro.js\",\n\t\"./ro.js\": \"./node_modules/moment/locale/ro.js\",\n\t\"./ru\": \"./node_modules/moment/locale/ru.js\",\n\t\"./ru.js\": \"./node_modules/moment/locale/ru.js\",\n\t\"./sd\": \"./node_modules/moment/locale/sd.js\",\n\t\"./sd.js\": \"./node_modules/moment/locale/sd.js\",\n\t\"./se\": \"./node_modules/moment/locale/se.js\",\n\t\"./se.js\": \"./node_modules/moment/locale/se.js\",\n\t\"./si\": \"./node_modules/moment/locale/si.js\",\n\t\"./si.js\": \"./node_modules/moment/locale/si.js\",\n\t\"./sk\": \"./node_modules/moment/locale/sk.js\",\n\t\"./sk.js\": \"./node_modules/moment/locale/sk.js\",\n\t\"./sl\": \"./node_modules/moment/locale/sl.js\",\n\t\"./sl.js\": \"./node_modules/moment/locale/sl.js\",\n\t\"./sq\": \"./node_modules/moment/locale/sq.js\",\n\t\"./sq.js\": \"./node_modules/moment/locale/sq.js\",\n\t\"./sr\": \"./node_modules/moment/locale/sr.js\",\n\t\"./sr-cyrl\": \"./node_modules/moment/locale/sr-cyrl.js\",\n\t\"./sr-cyrl.js\": \"./node_modules/moment/locale/sr-cyrl.js\",\n\t\"./sr.js\": \"./node_modules/moment/locale/sr.js\",\n\t\"./ss\": \"./node_modules/moment/locale/ss.js\",\n\t\"./ss.js\": \"./node_modules/moment/locale/ss.js\",\n\t\"./sv\": \"./node_modules/moment/locale/sv.js\",\n\t\"./sv.js\": \"./node_modules/moment/locale/sv.js\",\n\t\"./sw\": \"./node_modules/moment/locale/sw.js\",\n\t\"./sw.js\": \"./node_modules/moment/locale/sw.js\",\n\t\"./ta\": \"./node_modules/moment/locale/ta.js\",\n\t\"./ta.js\": \"./node_modules/moment/locale/ta.js\",\n\t\"./te\": \"./node_modules/moment/locale/te.js\",\n\t\"./te.js\": \"./node_modules/moment/locale/te.js\",\n\t\"./tet\": \"./node_modules/moment/locale/tet.js\",\n\t\"./tet.js\": \"./node_modules/moment/locale/tet.js\",\n\t\"./tg\": \"./node_modules/moment/locale/tg.js\",\n\t\"./tg.js\": \"./node_modules/moment/locale/tg.js\",\n\t\"./th\": \"./node_modules/moment/locale/th.js\",\n\t\"./th.js\": \"./node_modules/moment/locale/th.js\",\n\t\"./tk\": \"./node_modules/moment/locale/tk.js\",\n\t\"./tk.js\": \"./node_modules/moment/locale/tk.js\",\n\t\"./tl-ph\": \"./node_modules/moment/locale/tl-ph.js\",\n\t\"./tl-ph.js\": \"./node_modules/moment/locale/tl-ph.js\",\n\t\"./tlh\": \"./node_modules/moment/locale/tlh.js\",\n\t\"./tlh.js\": \"./node_modules/moment/locale/tlh.js\",\n\t\"./tr\": \"./node_modules/moment/locale/tr.js\",\n\t\"./tr.js\": \"./node_modules/moment/locale/tr.js\",\n\t\"./tzl\": \"./node_modules/moment/locale/tzl.js\",\n\t\"./tzl.js\": \"./node_modules/moment/locale/tzl.js\",\n\t\"./tzm\": \"./node_modules/moment/locale/tzm.js\",\n\t\"./tzm-latn\": \"./node_modules/moment/locale/tzm-latn.js\",\n\t\"./tzm-latn.js\": \"./node_modules/moment/locale/tzm-latn.js\",\n\t\"./tzm.js\": \"./node_modules/moment/locale/tzm.js\",\n\t\"./ug-cn\": \"./node_modules/moment/locale/ug-cn.js\",\n\t\"./ug-cn.js\": \"./node_modules/moment/locale/ug-cn.js\",\n\t\"./uk\": \"./node_modules/moment/locale/uk.js\",\n\t\"./uk.js\": \"./node_modules/moment/locale/uk.js\",\n\t\"./ur\": \"./node_modules/moment/locale/ur.js\",\n\t\"./ur.js\": \"./node_modules/moment/locale/ur.js\",\n\t\"./uz\": \"./node_modules/moment/locale/uz.js\",\n\t\"./uz-latn\": \"./node_modules/moment/locale/uz-latn.js\",\n\t\"./uz-latn.js\": \"./node_modules/moment/locale/uz-latn.js\",\n\t\"./uz.js\": \"./node_modules/moment/locale/uz.js\",\n\t\"./vi\": \"./node_modules/moment/locale/vi.js\",\n\t\"./vi.js\": \"./node_modules/moment/locale/vi.js\",\n\t\"./x-pseudo\": \"./node_modules/moment/locale/x-pseudo.js\",\n\t\"./x-pseudo.js\": \"./node_modules/moment/locale/x-pseudo.js\",\n\t\"./yo\": \"./node_modules/moment/locale/yo.js\",\n\t\"./yo.js\": \"./node_modules/moment/locale/yo.js\",\n\t\"./zh-cn\": \"./node_modules/moment/locale/zh-cn.js\",\n\t\"./zh-cn.js\": \"./node_modules/moment/locale/zh-cn.js\",\n\t\"./zh-hk\": \"./node_modules/moment/locale/zh-hk.js\",\n\t\"./zh-hk.js\": \"./node_modules/moment/locale/zh-hk.js\",\n\t\"./zh-mo\": \"./node_modules/moment/locale/zh-mo.js\",\n\t\"./zh-mo.js\": \"./node_modules/moment/locale/zh-mo.js\",\n\t\"./zh-tw\": \"./node_modules/moment/locale/zh-tw.js\",\n\t\"./zh-tw.js\": \"./node_modules/moment/locale/zh-tw.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/moment/locale sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack://backend/./node_modules/moment/locale/_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./node_modules/sequelize/lib/dialects/abstract sync recursive":
/*!************************************************************!*\
  !*** ./node_modules/sequelize/lib/dialects/abstract/ sync ***!
  \************************************************************/
/***/ ((module) => {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = () => ([]);\nwebpackEmptyContext.resolve = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/sequelize/lib/dialects/abstract sync recursive\";\nmodule.exports = webpackEmptyContext;\n\n//# sourceURL=webpack://backend/./node_modules/sequelize/lib/dialects/abstract/_sync?");

/***/ }),

/***/ "?038b":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/url_(ignored)?");

/***/ }),

/***/ "?5438":
/*!*******************************!*\
  !*** ./extend-node (ignored) ***!
  \*******************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/./extend-node_(ignored)?");

/***/ }),

/***/ "?5997":
/*!***************************!*\
  !*** ./streams (ignored) ***!
  \***************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/./streams_(ignored)?");

/***/ }),

/***/ "?e38f":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/http_(ignored)?");

/***/ }),

/***/ "?7993":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/url_(ignored)?");

/***/ }),

/***/ "?2147":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/url_(ignored)?");

/***/ }),

/***/ "?2a3a":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/url_(ignored)?");

/***/ }),

/***/ "?0d70":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://backend/url_(ignored)?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbackend"] = self["webpackChunkbackend"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./dist/js/server.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;