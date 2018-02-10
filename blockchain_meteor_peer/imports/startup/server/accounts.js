import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

// Generate user initials after Facebook login
Accounts.onCreateUser((options, user) => {

  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
  }
  else {
    user.profile = {};
  }


  let email = user.emails[0].address;

  console.log(email, Meteor.settings.adminEmails, user.profile);

  if(Meteor.settings.adminEmails.indexOf(email) > -1) {
    user.profile.admin = true;
  }

  // Don't forget to return the new user object at the end!
  return user;
});
