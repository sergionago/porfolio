require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI
const { MongoClient } = require('mongodb');
let client = '';

const connectDB = async () => {
    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log('Connection error: ' + err.message);
        process.exit(1);
    }
}

const getDB = () => {
    if (!client) {
        throw new Error('MongoDB Client is not defined');
    }
    return client.db(process.env.DB_NAME);
}

const closeConn = async () => {
    if (client) {
        await client.close();
        console.log('Connection closed');
    }
}

module.exports = { connectDB, getDB, closeConn }