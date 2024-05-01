const express = require('express');
const router = express.Router();

const Transaction = require('../models/transaction.js');

router.post('/', async (req, res, next) => {
  const t = new Transaction(req.body);
  await t.save();
  req.app.ws.emit('new-transaction', { message: t });
  return res.json(t);
});


router.get('/', async (req, res, next) => {
  const t = await Transaction.find();

  return res.json(t);
});


router.get('/bycoin/:coinid', async (req, res, next) => {
  const t = await Transaction.find({ coin: req.params.coinId});

  return res.json(t);
});

router.get('/bysender/:walletid', async (req, res, next) => {
  const t = await Transaction.find({ from: req.params.walletId});

  return res.json(t);
});

router.get('/byreceiver/:walletid', async (req, res, next) => {
  const t = await Transaction.find({ to: req.params.walletId});

  return res.json(t);
});

router.get('/bymined/', async (req, res, next) => {
  const t = await Transaction.find({ mined: true });

  return res.json(t);
});



module.exports = router;
