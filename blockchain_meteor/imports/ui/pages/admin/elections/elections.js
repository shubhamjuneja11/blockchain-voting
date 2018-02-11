import './elections.html';
import { Template } from 'meteor/templating';
import { Elections } from '../../../../api/elections/elections.js';
import { Parties } from '../../../../api/parties/parties.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import SHA256 from "crypto-js/sha256";

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
    let timestamp = template.$('#election_time').val();
    if(name === '' || parties.split(',').length < 1) {
      console.log("INVALID DATA");
    }
    Meteor.call('elections.add', {
      name,
      parties,
      timestamp
    }, (err, res) => {
      template.$('.modal').modal('show');
    });
  }
});

Template.elections_list_item.onCreated(function() {
  this.electionResult = new ReactiveVar(null);
});

Template.elections_list_item.onRendered(function() {
  let fn = () => {
    Meteor.call('get.votes.election', this.data.election._id, (err, res) => {
      if(!err) {
	res.forEach(f => {
	  f.electionId = this.data.election._id;
	});
	this.electionResult.set(res);
      }
    });
  }
  fn();
  setInterval(fn, 5000);
});

Template.elections_list_item.helpers({
  partyList() {
    let result = Template.instance().electionResult.get();
    return result ? result : [];
  }
});

Template.party_item.helpers({
  partyName() {
    let partyHash = this.party.partyHash;
    let election = Elections.findOne(this.party.electionId);
    let parties = Parties.find({ electionId: election._id }).fetch();
    for(var i = 0; i < parties.length; i++) {
      let partyNames = parties[i].partyList;
      for(var j = 0; j < partyNames.length; j++) {
	let name = partyNames[j];
	let hash = SHA256(election.timestamp+name).toString();
	if(hash === partyHash) {
	  return name;
	}
      }
    }
    return "";
  }
});

Template.elections_list_item.events({
  'click' (event, template) {
    FlowRouter.go('App.admin.voting', { electionId: template.data.election._id});
  }
});
