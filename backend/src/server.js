// Configuration and Logging handlers
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const debug = require('debug')('server');
const socketDebug = require('debug')('sockets');

// HTTP handlers
const createError = require('http-errors');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');

// Express framework and additional middleware
const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');

// Authentication middleware
const passport = require('passport');


const isDevelopment = (process.env.MODE === 'Development');
debug(`Is development mode ${isDevelopment}`);

// Create and configure the express app
const app = express();

// Express view/template engine setup
debug('setting up templating engine');
app.set('views', path.join(`${__dirname}/../`, 'views'));
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
const sequelize = require('./db/connection');
const {User,BlogEntry,Comment} = require('./models');
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
app.use(bodyParser.urlencoded({extended: true})); // and POST URL Encoded form support
app.use(session({secret: 'frankie', resave: true, saveUninitialized: true})); // Add session support
app.use(connectFlash()); // flash messages
app.use(passport.initialize()); // initialise the authentication
app.use(passport.session({})); // setup authentication to use cookie/sessions


/* Are we in Development or in Production? */
debug('Setting up server side logging with Morgan');
if (isDevelopment) {
    app.use(morgan('dev')); /* log server calls with performance timing with development details */

    /* log call requests with body */
    app.use((request, response, next) => {
        console.log(`Received request for ${request.url} with/without body`);
        if (request.body) console.log(request.body);
        next();
    });
} else {
    app.use(morgan('combined')); /* log server calls per standard combined Apache combined format */
}

// ensure the user is logged in with a path

debug('Installing routes');
const routes = require('./routes/index.js');
// add the middleware path routing
app.use('/', routes); // add the routes to the express middleware
// add the api path routing
const apiRoutes = require('./routes/api');
app.use('/api',apiRoutes);

// Setup authentication
debug('Setting up User model and authentication with Passport');
//load passport strategies
require('./passport/passport.js')(passport, User);

// route for the env.js file being served to the client
debug('Setting the environment variables for the browser to access');
const port = process.env.PORT || 3000;
const LOCAL_HOST_API_DEVELOPMENT = `http://localhost:${port}/api`;
const LOCAL_HOST_API_PRODUCTION = `https://localhost:${port}/api`;
let localhostAPIURL = LOCAL_HOST_API_DEVELOPMENT;
if (!isDevelopment) localhostAPIURL = LOCAL_HOST_API_PRODUCTION;
const API_SERVER_URL = process.env.API_SERVER_URL || localhostAPIURL;
const env = {serverURL: API_SERVER_URL};

app.get('/js/env.js', (req, res) => {
    let session = req.session;
    if (session.id) {
        env["id"] = session.id;
    }
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});


// catch 404 and forward to error handler
debug('Setting up 404 handler');
app.use((req, res, next) => {
    debug('404 forwarder');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
if (isDevelopment) {
    debug('Setting up DEV 500 handler');
    app.use((err, req, res, next) => {
        debug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
} else {
    debug('Production 500 handler');
    app.use((err, req, res, next) => {
        debug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });
}

const httpServer = http.Server(app);

httpServer.listen(port, () => {
    debug(`Server started on port ${port}`);
});
