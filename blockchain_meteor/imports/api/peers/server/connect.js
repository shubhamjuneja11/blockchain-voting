import { DDP } from 'meteor/ddp-client';
import { Peers } from '../peers.js';
import { Tracker } from 'meteor/tracker'
import { Mongo } from 'meteor/mongo';
const connections = [];

export const connectToPeer = (peerId) => {
  if(connections.indexOf(peerId) > -1) {
    console.log("Already attempting");
  }
  console.log(peerId);
  let peer = Peers.findOne(peerId);
  let ddp = DDP.connect(peer.address);
  let connected = false;
  let c_temp = false;
  setInterval(Meteor.bindEnvironment(() => {
    if(c_temp === connected) return;
    Peers.update(peerId, {
      $set: {
	status: connected
      }
    });
    c_temp = connected;
  }), 5000);

  let votes = new Mongo.Collection('votes', {
    connection: ddp
  });

  ddp.subscribe('peer.votes');

  votes.find().observe({
    added(document) {
      console.log(document);
    }
  });

  let computation = Tracker.autorun(function() {
    let status = ddp.status();
    connected = status.connected;
  });
};
