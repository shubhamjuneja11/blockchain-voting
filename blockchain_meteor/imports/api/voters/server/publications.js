import { Meteor } from 'meteor/meteor';
import { Voters } from '../voters.js';

Meteor.publish('valid.voters', function() {
  let user = Meteor.users.findOne(this.userId);
  if(!user || !user.profile.admin) return null;

  let now = Date.now();
  return Voters.find({
    validTill: {
      $gt: now
    }
  });
});


Meteor.publish('all.voters', function() {
  let user = Meteor.users.findOne(this.userId);
  if(!user || !user.profile.admin) return null;
  return Voters.find();
});
