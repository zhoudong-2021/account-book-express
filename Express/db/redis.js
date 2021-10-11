const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

const {port, host} = REDIS_CONF;
const redisClient = redis.createClient(port, host);
redisClient.on('error', err => {
    console.error(err);
});
module.exports = redisClient;
