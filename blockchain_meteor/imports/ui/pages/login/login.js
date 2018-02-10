import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './login.html';


Template.login_page.onRendered(function() {
  this.autorun(() => {
    if(Meteor.user() && Meteor.user().profile.admin) {
      FlowRouter.go('App.admin');
    }
  });
});
