const WebSocket = require('ws');
const Peer = require('./peer.js');
const ip = require('ip');
const _ = require('lodash');

const startWSServer = () => {
  return new Promise((resolve, reject) => {
    const wss = new WebSocket.Server({ port: process.env.WS_PORT});
    resolve(wss);
  });
};

const waitForSeconds = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(); }, seconds);
  });
};

const connectToServer = (address) => {
  return new Promise((resolve, reject) => {
    let ws = new WebSocket(address);
    ws.on('open', function() {
      resolve(ws);
    });
    ws.on('error', function(err) {
      reject(err);
    })
  });
};

class PeerManager {
  constructor() {
    this.wss = null;
    this.peers = {};

  }

  updateCount (count) {
    this.count = count;
  }

  async connect(count) {
    this.count = count;
    try {
      this.wss = await startWSServer();
      console.log(`Started websocket server on port : ${process.env.WS_PORT}`);

      this.wss.on('connection', async (ws, req) => {
	ws.port = req.connection.remotePort;
	this.setupConnectionToServer(ws, req.connection.remoteAddress, req.connection.remotePort);
	let list = _.map(this.peers, (val, key) => {
	  let split = key.split(':');
	  return {
	    address: split[0],
	    port: split[1]
	  };
	});

	let data = { type: 'peerlist', list  };
	ws.send(JSON.stringify(data));
      });

      this.wss.on('error', (err) => {
	console.log(err);
      });

      await this.connectToMain();

      await waitForSeconds(10000);

    }
    catch(err) {
      console.log(err);
    }
  }

  async fetchLatest () {
    _.each(this.peers, (ws) => {
      console.log(ws.count);
    });
  }

  async setupConnectionToServer(ws, add, port) {

    this.addPeer(ws, add+":"+port);

    ws.on('close', () => {
      this.removePeer(ws);
    });

    ws.on('error', (err) => {
      console.log(err);
    });

    ws.on('message', this.handleMessage.bind(this));
    ws.on('message', (data) => {

      this.handleMessage(data);
    });
  }

  async connectToMain() {
    console.log("Connecting to main server");
    let ownAddress = ip.address();
    if(ownAddress === process.env.WS_MAIN) {
      console.log("We are the main server :grin:");
      return;
    }

    try {
      let ws = await connectToServer(`ws://${process.env.WS_MAIN}:${process.env.WS_MAIN_PORT}`);
      console.log("Connected to main server");
      this.setupConnectionToServer(ws, process.env.WS_MAIN, process.env.WS_MAIN_PORT);
    }
    catch(err) {
      console.log(err);
      setTimeout(async () => {
	await this.connectToMain();
      }, 5000) ;
    }

  }

  handleMessage(data) {
    var info = JSON.parse(data);
    switch(info.type) {
    case 'peerlist': this.handlePeerList(info);
      break;
    default: break;
    }
    // switch(info.type) {
    // case 'peerlist': this.handlePeerList(info);
    //   break;
    // default: () => {};
    // }
  }

  async handlePeerList(data) {
    for(var i = 0; i < data.list.length; i++) {
      let ownIp = ip.address();
      console.log(data.list[i], ownIp);
      if( ownIp.includes(data.list[i].address) ) continue;
      if( this.peers.hasOwnProperty(data.list[i].address) ) continue;
      let ws = await connectToServer(`ws://${data.list[i].address}:${data.list[i].port}`)
      if(data.count) {
	ws.count = data.count;
      }
      this.setupConnectionToServer(ws, data.list[i].address, data.list[i].port);
    }

  }

  addPeer(ws, add) {
    if(this.peers.hasOwnProperty(add)) {
      return;
    }
    this.peers[add] = ws;
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
  let lf=this;
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
