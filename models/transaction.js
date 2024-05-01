const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
  from: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  to: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  coin: { type: Schema.Types.ObjectId, ref: 'Coin' },
  mined: { type: Boolean, default: false },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
