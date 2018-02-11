import { Meteor } from 'meteor/meteor';
import { Elections } from './elections.js';
import { Parties } from '../parties/parties.js';
import crypto from 'crypto';

Meteor.methods({
  'elections.add'({ name , parties, timestamp }) {
    let partyList = parties.split(',');
    let encryptedList = partyList.map(p => {
      return crypto.createHash('SHA256').update(timestamp + p).digest('hex');
    });
    let _id = crypto.createHash('SHA256').update(timestamp+name).digest('hex');
    let electionId =  Elections.insert({
      _id,
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
