import { Meteor } from 'meteor/meteor';
import { Elections } from './elections.js';
import { Parties } from '../parties/parties.js';
import crypto from 'crypto';

Meteor.methods({
  'elections.add'({ name , parties }) {
    let timestamp = Date.now();
    let partyList = parties.split(',');
    let encryptedList = partyList.map(p => {
      return crypto.createHash('SHA256').update(timestamp + p).digest('hex');
    });
    let electionId =  Elections.insert({
      name,
      encryptedList,
      timestamp
    });

    Parties.insert({
      electionId,
      partyList
    });

    return electionId;
  }
});
