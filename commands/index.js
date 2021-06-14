const handleAxie = require('./axie');
const handlePrice = require('./price');
const handlePayout = require('./payout');

const commands = {
    '$axie': (msg) => handleAxie(msg),
    '$price': (msg) => handlePrice(msg)
}

module.exports = commands;