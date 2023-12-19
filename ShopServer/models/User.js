const { MongoClient } = require("mongodb");
require('dotenv').config();
const connectCollection = require('../config/mongo')

const { collection, client } = connectCollection('shop', 'Users');

exports.createSchema = async () => {
    try {
/*         await client.connect(); */
        const db = client.db('shop');
        
        const collections = await db.listCollections().toArray();
        let collExists = false;
        
        collections.forEach(coll => {
            if (coll.name === 'Users') collExists = true
        })
        
    
        if (!collExists) {
            const schema = {
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
                username: {
                    type: 'string',          
                },
                role: {
                    type: 'string',
                }
            }

            await db.createCollection(
                'Users', {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: Object.keys(schema),
                        properties: {
                            ...schema
                        }
                    }
                }
            })
            await db.collection('Users').createIndex({email:1},{unique:true});
        }
    } finally {
        await client.close();
    }
}
