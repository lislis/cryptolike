const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
  from: { type: Schema.Types.ObjectId, ref: 'Wallet', required: false },
  to: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  coin: { type: Schema.Types.ObjectId, ref: 'Coin', required: true },
  mined: { type: Boolean, default: false, required: true },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
