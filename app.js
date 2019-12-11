var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/db');

var bodyParser = require('body-parser');
var session = require('express-session');
var userService = require('./lib/userService');

var app = express();


var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestTime);

 //  Hook

var expiryDate = new Date( Date.now() + 10 * 60 * 1000 );  // 有效期，单位是毫秒

app.set('trust proxy', 1)
 
//  Can't put  Session Init  On callBack
app.use(
      session({
        secret : 'skyline',
        name : 'skysession', 
        saveUninitialized: false,
        resave: true, 
        cookie: {
              maxAge: expiryDate  
            }
      })
);

app.use(function (req, res, next) {
  
     console.log('鉤子1');
    //   Application Level  MiddleWare
        

       next();
});

app.use(function (req, res,next) {

      // todo:  Determine The User  if  Has 
      userService.authenticate(req,res);

        console.log('鉤子2');
       //    Must  execute next()  , Route Level  will  excute
       next();
});

// controller


app.use('/api',apiRouter);
app.use('/db', dbRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口
 
//启动监听
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
 

// module.exports = app;
