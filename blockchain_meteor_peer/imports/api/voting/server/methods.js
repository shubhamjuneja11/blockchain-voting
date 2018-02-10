import { Meteor } from 'meteor/meteor';
import { Votes } from '../votes.js';

Meteor.methods({
  async 'get.votes.election'() {
    let electionIds = await Votes.rawCollection().distinct('electionId');
    let ptys = await Votes.rawCollection().distinct('data.partyHash');
    let parties = electionIds.map((id) => {
      let votes = Votes.findOne({ electionId: id , timestamp : {
	$ne: -1
      }});
      let partyVotes = ptys.map(p => {
	let votes = Votes.find({ electionId: id, 'data.partyHash' : p}).count();
	return {
	  partyHash: p,
	  count: votes
	};
      });
      partyVotes = partyVotes.filter(prty => prty.count > 0);
      return {
	electionName: votes.electionName,
	partyVotes
      };
    });
    parties = parties.filter(pr => pr.partyVotes.length > 0)

    return parties;
  }
});


// const getVote = (previousHash, data, timestamp, electionId, electionName) => {
//   let vote = {
//     previousHash,
//     data,
//     timestamp,
//     electionId,
//     electionName,
//     hash: getHash({ previousHash, data, timestamp, electionId })
//   };
//   return vote;
// };

// const getHash = (vote) => {
//   return crypto.createHash('SHA256').update(vote.electionId + vote.timestamp + JSON.stringify(vote.data) + vote.previousHash).digest('hex');
// };
