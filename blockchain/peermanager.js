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
    let ws = await connectToServer(`ws://${process.env.WS_MAIN}`);
    ws.on('open', () => {
      this.addPeer(ws);
    });
    ws.on('close', () => {
      this.removePeer(ws);
    });

    ws.on('message', this.handleMessage.bind(this));
  }

  handleMessage(data) {
    switch(data.type) {
    case 'peerlist': this.handlePeerList(data);
      break;
    default: () => {};
    }
  }

  async handPeerList(data) {

  }

  connecToPeer() {

  }
}


module.exports = new PeerManager();
