const { getDB, closeConn } = require('../config/mongo_config');

const createUser = (userData) => {
    try {
        getDB().collection('users').insertOne(userData);
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = (email) => {
    let user;
    try {
        user = getDB().collection('users').findOne({ mail: email })
    } catch (err) {
        throw err;
    }

    return user;
}

module.exports = { createUser, getUserByEmail }