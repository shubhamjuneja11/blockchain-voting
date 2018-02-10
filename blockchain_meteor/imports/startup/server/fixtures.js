// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { Peers } from '../../api/peers/peers.js';

Meteor.startup(() => {

  // Peers.remove({});
});
