import { Peers } from '../peers.js';
import WebSocket from 'ws';
import { Meteor } from 'meteor/meteor';

let wss = null;
const startWebServer = function() {
  wss = new WebSocket.Server({ port: Meteor.settings.wsport});
  console.log("STARTED WEBSOCKET SERVER AT "+Meteor.settings.wsport);

  wss.on('connection', Meteor.bindEnvironment((ws, res) => {
    let address = res.connection.remoteAddress.replace(/^.*:/, '');
    Peers.update({
      address
    }, {
      $set: {
	status: true
      }
    });

    let onerror = Meteor.bindEnvironment(() => {
      console.log("HERE");
      Peers.update({
	address
      }, {
	$set: {
	  status: false
	}
      });
    });

    ws.on('close', onerror);

    ws.on('error', onerror);
  }));

}

export {
  startWebServer
}
