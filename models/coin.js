const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exchange_rate: { type: Number, default: 1.0 },
  amount: { type: Number, default: 0.0 },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Coin', CoinSchema);
