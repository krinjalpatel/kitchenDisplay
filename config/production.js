const mongoose = require('mongoose');
var config = {};

config.environment = (process.env.TIER) ? process.env.TIER : 'development';
/************************************APP PATH**********************************/
config.APP_PATH = "../";

/********************************WEB ENV VARIABLES*****************************/
config.web = {};
// port
config.web.port = process.env.port || 8085;

process.env.TZ = 'UTC';
//session
config.session = {
    secret: '1234567890QWERTY',
    cookieName: 'session',
    proxy: true,
    resave: true,
    saveUninitialized: true
};
/****************** List of URL excluded for session check **************************/

config.BASEURL = 'http://localhost:' + config.web.port + 'dalviroo';

var MongoURI = 'mongodb://heroku_12345678:random_password@ds029017.mLab.com:29017/heroku_12345678'
// mongoose.connect('mongodb://localhost/local');
mongoose.connect(MongoURI);

let db = mongoose.connection;

db.once('open', function () {
    console.log('localDB connection opened');
});

db.on('connected', function () {
    console.log('localDB connected');
});

db.on('error', function (err) {
    console.error('Error in connecting localDB');
    console.error(err);
});

db.on('disconnected', function () {
    console.error('local DB Disconnected!');
});
db.on('disconnect', function (err) {
    console.error('local DB : disconnect Event Fired!');
    console.error(err);
});
db.on('connecting', function (ref) {
    console.log('local DB connecting.');
    console.log(ref);
});

db.on('close', function (ref) {
    console.log(ref);
    console.error(ref);
});

db.on('reconnected', function () {
    console.log('local DB reconnected at : ' + new Date());
    console.error('local DB reconnected at : ' + new Date());
});
db.on('reconnecting', function () {
    console.log('local DB reconnecting!');
});
config.dockerType = {
    cms: true
};
/**********************************ROUTER**************************************/
config.router = function (app) {
    if (config.dockerType.cms === true) {
    require('../app/controllers/AllRoutes')(app);
    require('../app/controllers/orderController')(app);
    require('../app/controllers/dishController')(app);
    require('../app/controllers/othersController')(app);
    require('../app/controllers/kitchenController')(app);
    }
};

module.exports = config;