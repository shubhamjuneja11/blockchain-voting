import './pre_vote.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.pre_vote.events({
  'submit #add-form'(event, template) {
    event.preventDefault();

    let voterId = template.$('#voter_id').val();

    if(voterId == '') {
      console.log("INVALID DATA");
      return;
    }

    Meteor.call('voter.get.token', voterId, (err, res) => {
      if(!err) {
	template.$('.modal').modal('show');
	template.$('#voter_id').val('');
	// FlowRouter.go('App.home');
      }
    });
  }
});
