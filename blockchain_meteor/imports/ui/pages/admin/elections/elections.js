import './elections.html';
import { Template } from 'meteor/templating';
import { Elections } from '../../../../api/elections/elections.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

Template.elections_list.onRendered(function() {
  this.subscribe('elections.all');
});


Template.elections_list.helpers({

  electionList() {
    return Elections.find();
  }
});

Template.elections_list.events({
  'submit #add-form'(event, template) {
    event.preventDefault();
    let name = template.$('#election_name').val();
    let parties = template.$('#party_list').val();
    if(name === '' || parties.split(',').length < 1) {
      console.log("INVALID DATA");
    }
    Meteor.call('elections.add', {
      name,
      parties
    });
  }
});

Template.elections_list_item.onCreated(function() {
  this.electionResult = new ReactiveVar(null);
});

Template.elections_list_item.onRendered(function() {
  Meteor.call('get.votes.election', this.data.election._id, (err, res) => {
    if(!err) {
      this.electionResult.set(res);
    }
  });
});

Template.elections_list_item.helpers({
  partyList() {
    let result = Template.instance().electionResult.get();
    return result ? result : [];
  }
});

Template.elections_list_item.events({
  'click' (event, template) {
    FlowRouter.go('App.admin.voting', { electionId: template.data.election._id});
  }
});
