import { Meteor } from 'meteor/meteor';
import { Peers } from './peers.js';

Meteor.methods({
  'peers.add'({ name, address }) {
    let timestamp = Date.now();
    return Peers.insert({
      name,
      address,
      status: false
    })
  }
});
