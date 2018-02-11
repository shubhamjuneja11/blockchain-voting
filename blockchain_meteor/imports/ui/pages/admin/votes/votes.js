import './votes.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Parties } from '../../../../api/parties/parties.js';
import SHA256 from "crypto-js/sha256";

Template.votes.onRendered(function() {
  let electionId = FlowRouter.getParam('electionId');
  this.subscribe('elections.one', electionId);
});

Template.votes.helpers({
  partyList() {
    let election = Parties.findOne();
    return election ? election.partyList : [];
  }
});

Template.votes.events({
  'submit #add-form'(event, template) {
    event.preventDefault();
    let voterId = template.$('#voter_id').val();
    let voterToken = template.$('#voter_token').val();
    let partyName = template.$('#party_hash').val();
    let electionId = FlowRouter.getParam('electionId');

    if(voterId === '' || partyName === '') {
      console.log('invalid data');

      return;
    }

    let voterSimpleHash = SHA256(voterId).toString();
    Meteor.call('votes.add', {
      voterSimpleHash,
      voterToken,
      partyName,
      electionId
    }, (err, res) => {
      if(!err) {
	template.$('.modal').modal('show');
	template.$('form')[0].reset();
      }
    });
  }
});
