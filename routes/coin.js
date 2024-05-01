const express = require('express');
const router = express.Router();

const Coin = require('../models/coin.js');

router.get('/', async (req, res, next) => {
  const c = await Coin.find();
  //.populate('character')
  return res.json(c);
});

module.exports = router;
