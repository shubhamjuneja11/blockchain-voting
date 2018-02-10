const crypto = require('crypto');

class Block {

  constructor(previousHash, data) {
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
    console.log("Adding block \n"+JSON.stringify(this));
  }

  calculateHash() {
    return crypto.createHash('SHA256').update(this.timestamp + this.data.toString() + this.previousHash).digest('hex');
  }
}

module.exports = Block;
