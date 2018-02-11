import { Meteor } from 'meteor/meteor';
import { Voters } from './voters.js';
import { Tokens } from './tokens.js';

let waitForSeconds = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
};

Meteor.methods({

  'register.voter'({ voterName, voterId }) {
    if(!Meteor.user() || !Meteor.user().profile.admin) return false;
    return Voters.upsert({
      voterId
    }, {
      $set: {
	voterName
      }
    });
  },

  'voter.get.token'(voterId) {

    let date = new Date();
    let finalDate = new Date(date.getTime() + (5*60000));

    Voters.update({
      voterId
    }, {
      $set: {
	token: Math.floor(100000 + Math.random() * 900000).toString(),
	validTill: finalDate.getTime()
      }
    });

    console.log(Voters.findOne({ voterId }));

    return true;
  }

});
