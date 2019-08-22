"use strict";
const ccxt = require('ccxt');


async function fetchDatanegociecoins() {
    const negociecoins = new ccxt.negociecoins();
    const market = await negociecoins.fetchTicker('BTC/BRL');
    return {
        name: 'negociecoins',
        cost: 0.007,
        bid: market.bid,
        ask: market.ask
    };
};

module.exports = fetchDatanegociecoins;