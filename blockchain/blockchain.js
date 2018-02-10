const mm = require('./mongo.js');
const Block = require('./block.js');

class Blockchain {

  constructor(chainName) {
    this.chain = mm.startChain(chainName);

    this.chain.find().count().then(count => {
      if(count < 1) {
	let genesisBlock = new Block(null, {});
	this.chain.insert(genesisBlock);
      }
    });
  }

  newEntry(data) {
    let lastBlock = this.getLastBlock();
    console.log(lastBlock);
  }

  getLastBlock() {
    return this.chain.findOne().then(l => console.log(l));
  }

}

module.exports = Blockchain;
