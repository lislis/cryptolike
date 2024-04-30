const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateSchema = new mongoose.Schema({
  open: Number,
  close: Number,
  high: Number,
  low: Number,
  volume: Number,
  openInt: Number,
  date: { type: Date, default: Date.now },
  coin: { type: Schema.Types.ObjectId, ref: 'Coin', required: true },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rate', RateSchema);
