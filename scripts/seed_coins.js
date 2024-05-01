require('dotenv').config();

const coins = [
  {
    name: "LauraCoin",
    exchange_rate: 1.0,
    amount: 0.0,
  },
  {
    name: "MarenCoin",
    exchange_rate: 1.0,
    amount: 0.0,
  },
  {
    name: "JolandaCoin",
    exchange_rate: 1.0,
    amount: 0.0,
  },
  {
    name: "LisaCoin",
    exchange_rate: 1.0,
    amount: 0.0,
  },
];


const MONGO_DB = process.env['MONGO_DB'];
const MONGO_HOST = process.env['MONGO_HOST'];

const mongoose = require('mongoose');
console.log(`[mongodb] mongodb://${MONGO_HOST}/${MONGO_DB}`);
mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`)
  .then(() =>  console.log('[mongodb] connection successful'))
  .catch((err) => console.log(err));

const Coin = require('../models/coin.js');

let coinPromises = [];
coins.forEach(async (coin) => {
  let c = new Coin(coin);
  coinPromises.push(c.save());
});


Promise.all(coinPromises).then(() => {
  console.log("Done");
  mongoose.connection.close();
  process.exit(1);
});
