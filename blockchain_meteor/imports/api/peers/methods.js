import { Meteor } from 'meteor/meteor';
import { Peers } from './peers.js';
import { DDP } from 'meteor/ddp-client';
import { connectToPeer } from './server/connect.js';

Meteor.methods({
  'peers.add'({ name, address }) {
    let user = Meteor.user();
    if(!user || !user.profile.admin) return false;
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
    let user = Meteor.user();
    if(!user || !user.profile.admin) return false;
    console.log(peerId);
    Peers.update(peerId, {
      $set: {
	deleteOnStart: true
      }
    });
    return true;
  },

  'peers.connect'(peerId) {
    let user = Meteor.user();
    if(!user || !user.profile.admin) return;
    if(Meteor.isServer) {
      connectToPeer(peerId);
    }
  }
});
