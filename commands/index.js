const handleAxie = require('./axie');
const handlePrice = require('./price');
const handlePayout = require('./payout');
const handleServer = require('./server');

const commands = {
    '$axie': (msg) => handleAxie(msg),
    '$price': (msg) => handlePrice(msg),
    '$server': (msg) => handleServer(msg)
}

module.exports = commands;