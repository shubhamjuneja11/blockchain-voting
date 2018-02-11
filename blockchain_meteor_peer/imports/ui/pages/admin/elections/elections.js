import './elections.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

Template.elections_list.onCreated(function() {
  this.electionResult = new ReactiveVar(null);
});

Template.elections_list.onRendered(function() {
  let fn = () => {
    Meteor.call('get.votes.election', (err, res) => {
      if(!err) {
	this.electionResult.set(res);
      }
    });
  };
  fn();
  setInterval(fn, 5000);
});


Template.elections_list.helpers({

  electionList() {
    let res =  Template.instance().electionResult.get();
    return res ? res : [];
    // return Elections.find();
  }
});


Template.elections_list_item.helpers({
  partyList() {

    return this.election.partyVotes;
  }
});
