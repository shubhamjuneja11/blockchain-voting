import { Meteor } from 'meteor/meteor';
import { Elections } from './elections.js';
import { Parties } from '../parties/parties.js';
import crypto from 'crypto';
import { Votes } from '../voting/votes.js';

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


    if(Votes.find({ electionId }).count() < 1) {
      Votes.insert(getVote(null, {}, -1, electionId, name));
    }

    return electionId;
  }
});


const getVote = (previousHash, data, timestamp, electionId, electionName) => {
  let vote = {
    previousHash,
    data,
    timestamp,
    electionId,
    electionName,
    hash: getHash({ previousHash, data, timestamp, electionId })
  };
  return vote;
};

const getHash = (vote) => {
  return crypto.createHash('SHA256').update(vote.electionId + vote.timestamp + JSON.stringify(vote.data) + vote.previousHash).digest('hex');
};
