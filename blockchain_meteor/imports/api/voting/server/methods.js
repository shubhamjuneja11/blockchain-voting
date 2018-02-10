import { Meteor } from 'meteor/meteor';
import { Votes } from '../votes.js';
import { Elections } from '../../elections/elections.js';
import crypto from 'crypto';

Meteor.methods({
  'votes.add'({ voterSimpleHash, partyName, electionId }) {
    let timestamp = Date.now();

    if(Votes.find({ electionId }).count() < 1) {
      Votes.insert(getVote(null, {}, -1, electionId));
    }

    let vote = Votes.find({ electionId }, {
      sort: { timestamp: -1 },
      limit: 1
    }).fetch();

    let { previousHash } = vote[0];
    let election = Elections.findOne(electionId);
    let partyHash = crypto.createHash('SHA256').update(election.timestamp + partyName).digest('hex');
    let voterHash = crypto.createHash('SHA256').update(voterSimpleHash + election.timestamp).digest('hex');

    if(Votes.findOne({
      electionId,
      'data.voterHash': voterHash
    })) {
      throw new Meteor.Error("Already voted");
    }

    Votes.insert(getVote(previousHash, { voterHash, partyHash }, Date.now(), electionId ));

    // TODO: BROADCAST TO PEERS
  },

  'get.votes.election'(electionId) {
    let election = Elections.findOne(electionId);
    let parties = election.encryptedList.map((partyHash) => {
      let count =  Votes.find({
	'data.partyHash': partyHash
      }).count();

      return {
	partyHash, count
      };
    });
    return parties;
  }
});


const getVote = (previousHash, data, timestamp, electionId) => {
  let vote = {
    previousHash,
    data,
    timestamp,
    electionId,
    hash: getHash({ previousHash, data, timestamp, electionId })
  };
  return vote;
};

const getHash = (vote) => {
  return crypto.createHash('SHA256').update(vote.electionId + vote.timestamp + JSON.stringify(vote.data) + vote.previousHash).digest('hex');
};