// Import server startup through a single index entry point

import { Meteor } from 'meteor/meteor';
import './fixtures.js';
import './register-api.js';
import './accounts.js';
import { startWebServer } from '../../api/peers/server/connectionmanager.js';

Meteor.startup(() => {
  startWebServer();
});
