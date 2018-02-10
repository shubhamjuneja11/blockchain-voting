require('dotenv').config()
const mongomanager = require('./mongo.js');
const Blockchain = require('./blockchain.js');
const Block = require('./block.js');


let electionChain = null;
mongomanager.connect()
  .then(() => {
    electionChain = new Blockchain('loksabha_2019');
  });


setTimeout(() => {
  electionChain.newEntry();
}, 2000);
