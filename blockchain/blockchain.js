const mm = require('./mongo.js');
const Block = require('./block.js');

class Blockchain {

  constructor(chainName) {
    this.chain = mm.startChain(chainName);

    this.chain.find().count().then(count => {
      if(count < 1) {
	let genesisBlock = new Block(null, {}, -1);
	this.chain.insert(genesisBlock);
      }
    });
  }

  onUpdate(cb) {
    this.onUpdate = cb;
  }

  async newEntry(data) {
    let lastBlock = await this.getLastBlock();
    let block = new Block(lastBlock.hash, data);
    //TODO:  check if voter has already voted
    await this.chain.insert(block);
    let count = await this.chain.count();
    if(this.onUpdate) {
      this.onUpdate(count);
    }
  }

  async getLastBlock() {
    return await this.chain.find().sort({ $timestamp: -1}).limit(1).next();
  }

  async getAllData () {
    return await this.chain.find().toArray();
  }

  async getCount () {
    return await this.chain.count();
  }

  async replaceChain(newBlocks) {
    let count = await this.getCount();
    if (validateChain(newBlocks) && newBlocks.length > count) {
      console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');

      this.chain.remove({});
      let genesisBlock = new Block(null, {}, -1);
      await this.chain.insert(genesisBlock);
      for(var i = 0; i < newBlocks.length; i++) {
	await this.newEntry(newBlocks[i].data);
      }
      return true;
    } else {
      console.log('Received blockchain invalid');
      return false;
    }
  }
}

const validateChain = (chain) => {
  let genesisBlock = new Block(null, {}, -1);
  if(JSON.stringify(chain[0]) !== JSON.stringify(genesisBlock)) return false;

  for(var i = 1; i < chain.length; i++) {
    if(chain[i-1].hash !== chain[i].previousHash) return false;
    if(!Block.verifyHash(chain[i-1].hash, chain[i].hash, chain[i])) {
      return false;
    }
  }
  return true;
};

module.exports = Blockchain;
