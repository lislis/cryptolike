const express = require('express');
const router = express.Router();

const Wallet = require('../models/wallet.js');

router.get('/', async (req, res, next) => {
  const w = await Wallet.find();
  return res.json(w);
});

router.post('/', async (req, res, next) => {
  const w = new Wallet(Wallet.newWallet(req.body.socket));
  await w.save();
  req.app.ws.emit('new-wallet', { message: w });
  return res.json(w);
});


module.exports = router;
