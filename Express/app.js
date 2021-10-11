var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const redisClient = require('./db/redis');
const connectRedis = require('connect-redis')(session);
const fs = require('fs');



// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const itemsRouter = require('./routes/items');

const storeSession = new connectRedis({
  client: redisClient
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* Make records of logger */
const ENV = process.env.NODE_ENV;
if(ENV === 'dev'){
  app.use(logger('dev'));// Print log into screen
}
else {
  const logFileParth = path.join(__dirname, 'log', 'access.log');
  const writeStream = fs.createWriteStream(logFileParth, {
    flags: 'a'
  });
  app.use(logger('combined', {
    // Write stream to ./logs/access.log
    stream: writeStream
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'PHGF_8745@',  //encryption
  cookie: {
  maxAge: 24 * 60 * 60 * 1000 //24 hours
  },
  store: storeSession // Store data into redis.
}));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
