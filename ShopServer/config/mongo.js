const { MongoClient } = require("mongodb");
require('dotenv').config();

const connectCollection = (dbName, collName) => {
    try {
        const client = new MongoClient(process.env.DB_MONGO);
        const db = client.db(dbName);
        return { collection: db.collection(collName), client: client };
    }
    catch(error){
        console.error("Error en la conexión DB");
        return null;
    }
}
module.exports = connectCollection;
