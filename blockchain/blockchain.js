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

  async newEntry(data) {
    let lastBlock = await this.getLastBlock();
    let block = new Block(lastBlock.hash, data);
    await this.chain.insert(block);
  }

  async getLastBlock() {
    return await this.chain.find().sort({ $natural: -1}).limit(1).next();
  }

}

module.exports = Blockchain;
