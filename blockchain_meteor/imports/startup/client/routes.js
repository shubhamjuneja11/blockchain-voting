import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/admin/elections/elections.js';
import '../../ui/pages/admin/peers/peers.js';
import '../../ui/pages/admin/votes/votes.js';
import '../../ui/pages/admin/voters/voters.js';
import '../../ui/pages/admin/voters/voters_all.js';
import '../../ui/pages/admin/votes/pre_vote.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

BlazeLayout.setRoot('body');

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'login_page' });
  }
});

FlowRouter.route('/admin', {
  name: 'App.admin',
  action() {
    BlazeLayout.render('App_body', { main: '' });
  }
});

FlowRouter.route('/admin/elections', {
  name: 'App.admin.elections',
  action() {
    BlazeLayout.render('App_body', { main: 'elections_list' });
  }
});

FlowRouter.route('/admin/peers', {
  name: 'App.admin.peers',
  action() {
    BlazeLayout.render('App_body', { main: 'peer_list' });
  }
});

FlowRouter.route('/admin/voters', {
  name: 'App.admin.voters',
  action() {
    BlazeLayout.render('App_body', { main: 'valid_voters' });
  }
});

FlowRouter.route('/admin/voters/all', {
  name: 'App.admin.voters.all',
  action() {
    BlazeLayout.render('App_body', { main: 'all_voters' });
  }
});

FlowRouter.route('/admin/voters/gettoken', {
  name: 'App.admin.voters.token',
  action() {
    BlazeLayout.render('pre_vote');
  }
});


FlowRouter.route('/admin/:electionId/voting', {
  name: 'App.admin.voting',
  action() {
    BlazeLayout.render('votes');
  }
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
