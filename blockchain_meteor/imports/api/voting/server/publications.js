import { Meteor } from 'meteor/meteor';
import { Votes } from '../votes.js';

Meteor.publish('peer.votes', function() {
  return Votes.find();
});
