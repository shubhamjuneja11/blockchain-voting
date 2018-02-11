import { Meteor } from 'meteor/meteor';
import { Peers } from './peers.js';
import { DDP } from 'meteor/ddp-client';
import { connectToPeer } from './server/connect.js';

Meteor.methods({
  'peers.add'({ name, address }) {
    let timestamp = Date.now();
    let peerId = Peers.insert({
      name,
      address,
      status: false
    });

    if(Meteor.isServer) {
      connectToPeer(peerId);
    }

    return peerId;
  },

  'peers.remove'(peerId) {
    console.log(peerId);
    Peers.update(peerId, {
      $set: {
	deleteOnStart: true
      }
    });
  },

  'peers.connect'(peerId) {

    if(Meteor.isServer) {
      connectToPeer(peerId);
    }
  }
});
