const { MongoClient } = require("mongodb");
const { Client } = require("undici-types");
const url = "";
let _db;
const connectDB = (callback) => {
  MongoClient.connect(url)
    .then((Client) => {
      console.log("connected");
      db = Client.db("user");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};
const getDb = () => {
  if (db) {
    return db;
  } else {
    throw new Error("No database found");
  }
};
module.exports = mongoConnect;
module.exports.getDb = getDb;
