import { DDP } from 'meteor/ddp-client';
import { Peers } from '../peers.js';
import { Tracker } from 'meteor/tracker'
import { Mongo } from 'meteor/mongo';
import { Votes } from '../../voting/votes.js';
import { Elections } from '../../elections/elections.js';
import crypto from 'crypto';

const connections = [];

export const connectToPeer = (peerId) => {
  if(connections.indexOf(peerId) > -1) {
    console.log("Already attempting");
  }
  console.log(peerId);
  let peer = Peers.findOne(peerId);
  let ddp = DDP.connect(peer.address);
  let connected = false;
  let c_temp = false;
  setInterval(Meteor.bindEnvironment(() => {
    if(c_temp === connected) return;
    Peers.update(peerId, {
      $set: {
	status: connected
      }
    });
    c_temp = connected;
  }), 5000);

  let votes = new Mongo.Collection('votes', {
    connection: ddp
  });

  ddp.subscribe('peer.votes');

  votes.find().observe({
    added(document) {
      if(checkVote(document)) {
	Votes.insert(document);
      }
    }
  });

  let computation = Tracker.autorun(function() {
    let status = ddp.status();
    connected = status.connected;
  });
};

const checkVote = (vote) => {
  console.log(vote);
  if(Votes.findOne({ hash: vote.hash })) return false;


  let lastVote = Votes.find({ electionId: vote.electionId }, {
    sort: { timestamp: 1 },
    limit: 1
  }).fetch();

  let { hash } = lastVote[0];
  let currentHash = crypto.createHash('SHA256').update(vote.electionId + vote.timestamp + JSON.stringify(vote.data) + hash).digest('hex');

  console.log(currentHash === vote.hash);
  return currentHash === vote.hash;
};
