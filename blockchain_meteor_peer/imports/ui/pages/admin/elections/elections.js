import './elections.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

Template.elections_list.onCreated(function() {
  this.electionResult = new ReactiveVar(null);
});

Template.elections_list.onRendered(function() {
  Meteor.call('get.votes.election', (err, res) => {
    if(!err) {
      this.electionResult.set(res);
    }
  });
});


Template.elections_list.helpers({

  electionList() {
    let res =  Template.instance().electionResult.get();
    console.log(res);
    return res ? res : [];
    // return Elections.find();
  }
});


Template.elections_list_item.helpers({
  partyList() {

    return this.election.partyVotes;
  }
});

Template.elections_list_item.events({
  'click' (event, template) {
    FlowRouter.go('App.admin.voting', { electionId: template.data.election._id});
  }
});
