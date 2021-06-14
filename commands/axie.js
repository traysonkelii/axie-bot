const handleAxie = (msg) => {
    msg.channel.send(`Axie called with ${msg.content}`);
}

module.exports = handleAxie;