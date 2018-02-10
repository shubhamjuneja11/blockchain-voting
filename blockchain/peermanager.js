const WebSocket = require('ws');
const Peer = require('./peer.js');
const ip = require('ip');

const startWSServer = () => {
  return new Promise((resolve, reject) => {
    const wss = new WebSocket.Server({ port: process.env.WS_PORT});
    resolve(wss);
  });
};

const connectToServer = (address) => {
  return new Promise((resolve, reject) => {
    let ws = new WebSocket(address);
    ws.on('open', function() {
      resolve(ws);
    });
  });
};

class PeerManager {
  constructor() {
    this.wss = null;
    this.peers = {};

  }

  async connect() {
    this.wss = await startWSServer();
    console.log(`Started websocket server on port : ${process.env.WS_PORT}`);

    this.wss.on('connection', (ws) => {
      let peerList = this.wss.clients;
      console.log(peerList);
    });

    await this.connectToMain();
  }

  async connectToMain() {
    console.log("Connecting to main server");
    let ownAddress = ip.address();
    if(ownAddress === process.env.WS_MAIN) {
      console.log("We are the main server :grin:");
      return;
    }
    let ws = await connectToServer(`ws://${process.env.WS_MAIN}:${process.env.WS_MAIN_PORT}`);
    ws.on('open', () => {
      this.addPeer(ws);
    });
    ws.on('close', () => {
      this.removePeer(ws);
    });

    ws.on('message', (data) => {
      this.handleMessage(data);
    });
  }

  handleMessage(data) {
    var info = JSON.parse(data);
    console.log(info);
    // switch(info.type) {
    // case 'peerlist': this.handlePeerList(info);
    //   break;
    // default: () => {};
    // }
  }

  async handPeerList(data) {
    console.log(data);
  }

  addPeer(ws) {
    if(this.peers.hasOwnProperty(ws.address)) {
      return;
    }
    this.peers[ws.address] = ws;
  }

  removePeer (ws) {
    if(this.peers.hasOwnProperty(ws.address)) {
      delete this.peers[ws.address];
    }
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

compareHash(hash,prevHash){
  if(hash!=prevHash)
  return false;
  else return true;
}


}


module.exports = new PeerManager();
