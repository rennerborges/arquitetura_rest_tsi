var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companiesRouter = require('./routes/companies');

var app = express();

// ===========================================
// ============= Banco de dados ==============
// ===========================================
const connection = require('./config/connection')();

// ===========================================
// ============= Configurações ===============
// ===========================================

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ===========================================
// ================= Rotas ===================
// ===========================================

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/companies', companiesRouter);

app.use((req, res, next) => {
  let error = new Error('Not found');
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({ error });
});

module.exports = app;
