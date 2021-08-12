"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Configuration and Logging handlers
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var debug_1 = __importDefault(require("debug"));
dotenv_1.default.config();
var socketserverDebug = debug_1.default('socket');
var serverDebug = debug_1.default('server');
// HTTP handlers
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
// Express framework and additional middleware
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var connect_flash_1 = __importDefault(require("connect-flash"));
// Sockets
var SocketManager_1 = __importDefault(require("./util/SocketManager"));
// Authentication middleware
var passport_1 = __importDefault(require("passport"));
var isDevelopment = (process.env.MODE === 'Development');
serverDebug("Is development mode " + isDevelopment);
// Create and configure the express app
var app = express_1.default();
// Express view/template engine setup
serverDebug('setting up templating engine');
app.set('views', path_1.default.join(__dirname + "/../", 'views'));
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
// load models
var connection_1 = __importDefault(require("./db/connection"));
var models_1 = require("./models");
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
    app.use(function (request, response, next) {
        serverDebug("Received request for " + request.url + " with/without body");
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
var routes_1 = __importDefault(require("./routes"));
// add the middleware path routing
app.use('/', routes_1.default); // add the routes to the express middleware
// add the api path routing
var api_1 = __importDefault(require("./routes/api"));
app.use('/api', api_1.default);
// Setup authentication
serverDebug('Setting up User model and authentication with Passport');
//load passport strategies
var passport_2 = __importDefault(require("./passport/passport"));
// @ts-ignore
passport_2.default(passport_1.default, models_1.User);
// route for the env.js file being served to the client
serverDebug('Setting the environment variables for the browser to access');
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
        env.id = session.id;
    }
    res.send("window.ENV = " + JSON.stringify(env));
});
// catch 404 and forward to error handler
serverDebug('Setting up 404 handler');
app.use(function (req, res, next) {
    serverDebug('404 forwarder');
    var err = new Error('Not Found');
    // @ts-ignore
    err.status = 404;
    next(err);
});
// error handler
if (isDevelopment) {
    serverDebug('Setting up DEV 500 handler');
    // @ts-ignore
    app.use(function (err, req, res, next) {
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
    app.use(function (err, req, res, next) {
        serverDebug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });
}
var httpServer = new http_1.default.Server(app);
// setup the sockets manager with the server
SocketManager_1.default.connectToServer(httpServer);
httpServer.listen(port, function () {
    serverDebug("Server started on port " + port);
    // start listening for socket events
    SocketManager_1.default.listen();
});
//# sourceMappingURL=server.js.map