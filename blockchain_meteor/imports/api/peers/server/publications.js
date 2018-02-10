import { Meteor } from 'meteor/meteor';
import { Peers } from '../peers.js';

Meteor.publish('peers.all', function () {
  let userId = this.userId;
  let user = Meteor.users.findOne(userId);
  if(user.profile.admin) {
    return Peers.find();
  }

  return null;

});
