import './peers.html';
import { Template } from 'meteor/templating';
import { Peers } from '../../../../api/peers/peers.js';
import { Meteor } from 'meteor/meteor';

Template.peer_list.onRendered(function() {
  this.subscribe('peers.all');
});


Template.peer_list.helpers({

  peerList() {
    return Peers.find();
  }
});

Template.peer_list.events({
  'submit #add-form'(event, template) {
    event.preventDefault();
    let name = template.$('#peer_name').val();
    let address = template.$('#address').val();
    if(name === '' || address == '') {
      console.log("INVALID DATA");
    }
    Meteor.call('peers.add', {
      name,
      address
    });
  }
});

Template.peer_item.helpers({
  isConnected () {

    return this.peer.status === true ? "Connected" : "Offline";
  }
});

Template.peer_item.events({
  'click #connect'(event, template) {
    Meteor.call('peers.connect', template.data.peer._id);
  },

  'click #remove'(event, template) {
    console.log(template.data.peer);
    Meteor.call('peers.remove', template.data.peer._id);
  }
});
