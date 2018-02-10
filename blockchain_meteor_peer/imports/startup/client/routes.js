import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/admin/elections/elections.js';
import '../../ui/pages/admin/peers/peers.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

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


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
