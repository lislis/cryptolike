require('dotenv').config();

var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var ws = require('ws');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const MONGO_DB = process.env['MONGO_DB'];
const MONGO_HOST = process.env['MONGO_HOST'];

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb'}));
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(cookieParser());
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
console.log(`[mongodb] mongodb://${MONGO_HOST}/${MONGO_DB}`);
mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`)
  .then(() =>  console.log('[mongodb] connection successful'))
  .catch((err) => console.log(err));

app.ws = new ws.Server({ noServer: true, clientTracking: true });
app.ws.on('connection', socket => {
  socket.on('message', message => console.log(message));
});


const wallet = require('./routes/wallet');
const coin = require('./routes/coin');

app.use('/api/wallets', wallet);
app.use('/api/coins', coin);


//app.state = {};


function heartbeat() {
  this.isAlive = true;
}

const interval = setInterval(function ping() {
  app.ws.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);


app.ws.on('close', function close() {
  clearInterval(interval);
});

app.ws.on("connection", (ws, req) => {
  console.log(`[ws][opened] ${ws}`);
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  const ip = req.socket.remoteAddress;

  ws.on('message', (data) => {
    //logger(`[ws][incoming] ${data}`);
    let msg = '' + data; // data is a buffer
    console.log(msg);
  });

  ws.on('disconnect', (ws) => {
    console.log(`[ws][disconnect] ${ws}`);
  });



});

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
