require('dotenv').config()
const mongomanager = require('./mongo.js');
const Blockchain = require('./blockchain.js');
const peermanager = require('./peermanager.js');

const startNode = async () => {
  await mongomanager.connect();
  let electionChain = new Blockchain('loksabha_2019');

  electionChain.onUpdate(peermanager.updateCount);

  let count = await electionChain.getCount();
  await peermanager.connect(count);

  await peermanager.fetchLatest();
};



startNode();
