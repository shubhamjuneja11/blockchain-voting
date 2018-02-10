require('dotenv').config()
const mongomanager = require('./mongo.js');
const Blockchain = require('./blockchain.js');
const peermanager = require('./peermanager.js');

const startNode = async () => {
  await mongomanager.connect();
  await peermanager.connect();
  let electionChain = new Blockchain('loksabha_2019');
};



startNode();
