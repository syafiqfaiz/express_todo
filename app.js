var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var indexRouter = require('./routes/index');
var todoRouter = require('./routes/todo');

var app = express();

var tulisLaporan = (req, _res, next) => {
  var url = req.url
  var method = req.method
  var params = req.params
  var query = req.query

  console.log("url ", url, "method ",method,"params ", params, "query ", query);

  next()
}

// var checkKunci = (req, res, next) => {
//   var query = req.query

//   if (query.kunci != '1234') {
//     res.render('error', {
//       message: 'Invalid token',
//       error: {
//         status: 403,
//         stack: 'You do not have access to this page'
//       },
//     })
//     return
//   }

//   next()
// }


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(checkKunci)
app.use(tulisLaporan)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todos', todoRouter)
app.use('/users', require('./routes/user'))

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

module.exports = app;
