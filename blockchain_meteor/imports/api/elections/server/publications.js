import { Meteor } from 'meteor/meteor';
import { Elections } from '../elections.js';
import { Parties } from '../../parties/parties.js';

Meteor.publish('elections.all', function () {
  let userId = this.userId;
  let user = Meteor.users.findOne(userId);
  if(user.profile.admin) {
    return [Elections.find(), Parties.find()];
  }

  return null;

});

Meteor.publish('elections.one', function (electionId) {
  let userId = this.userId;
  let user = Meteor.users.findOne(userId);
  if(user.profile.admin) {
    return [Parties.find({ electionId }), Elections.find(electionId)];
  }

  return null;

});
