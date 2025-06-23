var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var app = express(); 

app.use(session({
  secret: 'seuSegredo',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Rotas
var indexRouter = require('./routes/index');
const usuarioRouter = require('./routes/usuario');
const postagemRouter = require('./routes/postagem');
const comentarioRouter = require('./routes/comentario');
const authRoutes = require('./routes/auth');
const verPostagemsRouter = require('./routes/verPostagens');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Usa as rotas
app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/postagem', postagemRouter);
app.use('/comentario', comentarioRouter);
app.use('/', authRoutes);
app.use('/verPostagens', verPostagemsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
