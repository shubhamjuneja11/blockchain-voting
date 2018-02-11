import { Template } from 'meteor/templating';
import { Voters } from '../../../../api/voters/voters.js';
import './voters.html';

Template.valid_voters.onRendered(function() {
  this.subscribe('valid.voters');
});

Template.valid_voters.helpers({
  voterList() {
    return Voters.find();
  }
});
