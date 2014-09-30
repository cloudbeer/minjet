var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();

//session setup
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'minjet blabla'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/res', express.static(path.join(__dirname, 'res')));

// session 拦截
var utils = require('./share/utils');
app.use("/api/", function (req, res, next) {
  utils.checkLogin(req, res);
  next();
});


var routes_ui = require('./routes/ui');
var routes_rest = require('./routes/rest');


app.use('/', routes_ui);
app.use('/', routes_rest);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers


var errors = require('./share/errors');

app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.send(err.status || 288, err);
  } else if (err.code === errors.NOT_LOGIN.code) {
    res.redirect("/login?back=" + encodeURIComponent(err.back));
  } else {
    next(err);
  }
});

/*
 // development error handler
 // will print stacktrace
 if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: err
 });
 });
 }
 */


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;