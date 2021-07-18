const cheerio = require('cheerio');
const fetch = require('node-fetch');
const MARKET_KEYWORD = 'market', GAME_KEYWORD = 'game';

const serverStatusUrl = 'https://axie.zone/axie-infinity-server-status';

const handleServer = async (msg) => {
    const res = await fetch(serverStatusUrl);
    const html = await res.text();
    const [command, site] = msg.content.split(' '); 

    if(!(site && (site === MARKET_KEYWORD || site === GAME_KEYWORD))) {
        msg.channel.send('Not a valid action');
    }

    const siteContentArray = validateSite(site);
    const $ = cheerio.load(html);
    
    const message = siteContentArray.reduce((acc, statusClass) => {
        const statusColor = parseColor(statusClass, $);
        const status = colorToStatus(statusColor);
        return acc + `${statusClass}: ${status}\n`;
    }, '');

    msg.channel.send(message);
}

const colorToStatus = (color) => {
    switch (color) {
        case 'red':
            return `red - down`;
        case 'yellow':
            return `yellow - okay/slower`;
        case 'green':
            return `green - good`;
        case 'grey':
            return `grey - unknown/slow`;
        default:
            return `Error time to check the code`
    }
}

const validateSite = (site) => {
    if(site === MARKET_KEYWORD) return ['cloudflare', 'graphql'];   
    if(site === GAME_KEYWORD) return ['maintenance', 'login', 'battles'];
    return [];
}

const parseColor = (statusClass, $) => {
    const parsedColor =  $(`span[id=status_${statusClass}]`)[0].attribs.class.split(' ')[1];
    return color = parsedColor && parsedColor.length > 0 ? parsedColor : 'error';
}

module.exports = handleServer;