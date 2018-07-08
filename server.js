if(!(process.env.TIER)){
  process.env.TIER='production';
}
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/'+ process.env.TIER || 'production');

//app setup
var app = express();

//cookie parser
app.use(cookieParser());
//session
app.use(session(config.session));
//set path for static resources
app.use(express.static(__dirname + '/public'));
// body parser to parse form body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.disable('view cache');

app.use(function(req, res, next) {
    next();
});
app.get('*', function(req, res, next) {
    var splitURL = (req.originalUrl).split('?'); // split URL for separating path and params
    var urlCheck = (splitURL[0]).split('/').pop(); // get URL last params
    switch (urlCheck) {
        case 'list':
            next();
            break;
        case 'insert':
        case 'create':
            next();
            break;
        default:
            next();
    }
});

var server = app.listen(process.env.PORT || 5000, function() {
    config.router(app);
});
