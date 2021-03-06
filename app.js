"use strict";

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let connect = require('connect');
let methodOverride = require('method-override');

let index = require('./routes/index');
let services = require('./routes/services');
let pricing = require('./routes/pricing');
let about = require('./routes/about');
let contact = require('./routes/contact');
let posts = require('./routes/posts');
let accounts = require('./routes/accounts');
let notes = require('./routes/notes');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( methodOverride(function(req, res){
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}) );


//TODO: use session Token for security;
// app.use(express.session({secret: "hshshshsh"}));
// app.use(express.csrf())
// app.use(function(req, res, next) {
//     res.locals.csrftoken = req.csrfToken();
//     next();
// });

app.use(express.static(path.join(__dirname, 'public')));

//routing
app.use('/', index);
app.use('/contact', contact);
app.use('/about', about);
app.use('/services', services);
app.use('/pricing', pricing);
app.use('/notes', notes);
app.use('/posts', posts);
app.use('/accounts', accounts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
