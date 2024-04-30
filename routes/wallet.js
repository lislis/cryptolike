const express = require('express');
const router = express.Router();

const Wallet = require('../models/wallet.js');

const { anonymousAnimal } = require('../util/animals.js');
const { randomString } = require('../util/helpers.js');

router.get('/', async (req, res, next) => {
  const w = await Wallet.find();
    //.populate('character')
  return res.json(w);
});

router.post('/', async (req, res, next) => {
  const w = new Wallet(newWallet());
  await w.save();
  req.app.ws.emit('new-wallet', { message: w });
  return res.json(w);
});


function newWallet() {
  let w = {
    name: anonymousAnimal(),
    pub_key: randomString(24),
    priv_key: randomString(24),
  };
  return w;
}

module.exports = router;
