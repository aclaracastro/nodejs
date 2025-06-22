const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const listaArquivosRouter = require('./routes/lista-arquivos');
const arquivoRouter = require('./routes/arquivo');

const app = express();

const vlista = require('./data/files.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lista-arquivos', listaArquivosRouter);
app.use('/arquivo/id:', arquivoRouter);

app.param('id', function(req, res, next, id) {
  req.arquivo = vlista.filter((item) => item.id === Number(id));

  if(req.arquivo[0]){
    next();
  } else {
    next(createError(404, 'Erro ao buscar arquivo'));
  }
});

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
