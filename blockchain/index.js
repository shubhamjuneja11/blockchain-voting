require('dotenv').config()
const mongomanager = require('./mongo.js');
const Blockchain = require('./blockchain.js');
const Block = require('./block.js');


let electionChain = null;
mongomanager.connect()
  .then(() => {
    electionChain = new Blockchain('loksabha_2019');
  });


setTimeout(async () => {
  await electionChain.newEntry({ voterId: 'adf', partyId: 'addf'});
  await electionChain.newEntry({ voterId: 'adfd', partyId: 'npa'});
}, 2000);
