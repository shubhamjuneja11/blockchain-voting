import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Voters } from '../../../../api/voters/voters.js';

import './voters_all.html';

Template.all_voters.onRendered(function() {
  this.subscribe('all.voters');
});

Template.all_voters.helpers({
  voterList() {
    return Voters.find();
  }
});

Template.all_voters.events({
  'submit #add-form'(event, template) {
    event.preventDefault();
    let voterName = template.$('#voter_name').val();
    let voterId = template.$('#voter_id').val();
    if(voterName === '' || voterId == '') {
      console.log("INVALID DATA");
    }
    Meteor.call('register.voter', {
      voterName,
      voterId
    });
  }
});
