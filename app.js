require('dotenv').config();

var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const MONGO_DB = process.env['MONGO_DB'];
const MONGO_HOST = process.env['MONGO_HOST'];

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(bodyParser.json({ limit: '1mb'}));

app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
console.log(`[mongodb] mongodb://${MONGO_HOST}/${MONGO_DB}`);
mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`)
  .then(() =>  console.log('[mongodb] connection successful'))
  .catch((err) => console.log(err));

const wallet = require('./routes/wallet');
const coin = require('./routes/coin');
const transaction = require('./routes/transaction');

app.use('/api/wallets', wallet);
app.use('/api/coins', coin);
app.use('/api/transactions', transaction);

app.use(express.static('frontend/dist'));

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
