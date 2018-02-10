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
  validChain(){
   let oldBlock=null;
   let flag=true;
   let blocks = this.chain.find();
   let self=this;
   blocks.forEach(function(block){
     if(oldBlock!=null)
       if(!self.compareHash(block.prevhash,oldBlock.hash)){
         flag=false;

       }
       oldBlock=block;
   });
   return flag;
 }
 resolveChain(){

 }
 compareHash(hash,prevHash){
   if(hash!=prevHash)
   return false;
   else return true;
 }


}

module.exports = Blockchain;
