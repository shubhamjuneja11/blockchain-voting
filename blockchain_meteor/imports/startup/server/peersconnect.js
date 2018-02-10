import { Meteor } from 'meteor/meteor';
import { Peers } from '../../api/peers/peers.js';
import { connectToPeer } from '../../api/peers/server/connect.js';

Meteor.startup(function() {
  Peers.find().forEach(peer => {
    connectToPeer(peer._id);
  });
});
