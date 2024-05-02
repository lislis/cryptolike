const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { anonymousAnimal } = require('../util/animals.js');
const { randomString } = require('../util/helpers.js');


const WalletSchema = new mongoose.Schema({
  name: String,
  pub_key: String,
  priv_key: String,
  offline: Boolean,
  socket: String,
  created_date: { type: Date, default: Date.now },
});

WalletSchema.static('newWallet', function newWallet(socket = null) {
  let w = {
    name: anonymousAnimal(),
    pub_key: randomString(24),
    priv_key: randomString(24),
    offline: false,
    socket,
  };
  return w;
});

module.exports = mongoose.model('Wallet', WalletSchema);
