const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new mongoose.Schema({
  name: String,
  pub_key: String,
  priv_key: String,
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wallet', WalletSchema);
