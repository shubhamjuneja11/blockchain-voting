const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}`;

const dbName = process.env.MONGO_DBNAME;


class MongoManager {

  constructor() {
    this.db = null;
  }

  connect() {
    let self = this;
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      self.db = client.db(dbName);
      // client.close();
    });
  }
}

module.exports = new MongoManager();
