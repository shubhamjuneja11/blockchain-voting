require('dotenv').config()
const mongomanager = require('./mongo.js');
const Blockchain = require('./blockchain.js');
const peermanager = require('./peermanager.js');

const startNode = async () => {
  await mongomanager.connect();
  let electionChain = new Blockchain(process.env.CHAIN_NAME);

};



startNode();
