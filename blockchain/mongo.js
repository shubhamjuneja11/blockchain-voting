const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}`;

const dbName = process.env.MONGO_DBNAME;


class MongoManager {

  constructor() {
    this.db = null;
  }

  async connect() {
    let self = this;
    return await new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to server");
	self.db = client.db(dbName);
	if(!err) resolve(self.db);
	else {
	  reject(err);
	}
      });
    });
  }

  startChain(chainName, cb) {
    return this.db.collection(chainName);
  }

}

module.exports = new MongoManager();
