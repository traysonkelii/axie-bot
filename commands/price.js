const axios = require('axios').default;
const coinMarketCap = 'https://pro-api.coinmarketcap.com';

const handlePrice = (msg) => {
    const params = msg.content.split(' ');
    let tokenName = params[1];
    let currency = params[2];

    const headers = {
        'X-CMC_PRO_API_KEY': process.env.CMC_TOKEN
    }

    if (tokenName) {
        tokenName = tokenName.toUpperCase();
        currency = currency ? currency.toUpperCase() : null;
        let url = currency ?
            `${coinMarketCap}/v1/cryptocurrency/quotes/latest?symbol=${tokenName}&convert=${currency.toUpperCase()}` :
            `${coinMarketCap}/v1/cryptocurrency/quotes/latest?symbol=${tokenName}`;
        
        axios.get(url, { headers })
            .then((res) => {
                let quoteType = currency ? currency : 'USD';
                const price = res.data.data[tokenName].quote[quoteType].price.toFixed(2);
                msg.channel.send(`${tokenName} price: ${price} [${quoteType}]`);
            })
            .catch(err => {
                
                const status = err.response.status;
                let message;
                switch (status) {
                    case 400:
                        message = `Token or Currency not found`;
                        break;
                    case 401:
                        message = `Unauthorized, contact manager`
                        break;
                    case 402:
                        message = `Payment required, contact manager`
                        break;
                    case 403:
                        message = `Forbidden, contact manager`
                        break;
                    case 429:
                        message = `Too many request right now, try again later`
                        break;
                    case 500:
                        message = `Problem with API, try again later`
                        break;
                    default:
                        message = `Unknown error`
                        break;
                }
                msg.channel.send(message);
            })
    } else {
        msg.channel.send(`Error the $price command requires 1 paramter [TOKEN NAME]`)
    }

}

module.exports = handlePrice;