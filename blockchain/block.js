const crypto = require('crypto');

class Block {

  constructor(previousHash, data, timestamp) {
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
    console.log("Adding block \n"+JSON.stringify(this));
  }

  calculateHash() {
    return crypto.createHash('SHA256').update(this.timestamp + JSON.stringify(this.data) + this.previousHash).digest('hex');
  }

  static verifyHash(previousHash, currentHash, block) {
    let hash = crypto.createHash('SHA256').update(block.timestamp + JSON.stringify(block.data) + previousHash).digest('hex');

    return hash === currentHash;
  }
}

module.exports = Block;
