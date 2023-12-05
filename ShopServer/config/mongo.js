const { MongoClient } = require("mongodb");
require('dotenv').config();

const connectCollection = (dbName, collName) => {
    const client = new MongoClient(process.env.DB_MONGO);
    const db = client.db(dbName);
    return {collection: db.collection(collName),client:client};
}
module.exports = connectCollection;
