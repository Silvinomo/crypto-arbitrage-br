"use strict";
const ccxt = require('ccxt');

async function fetchDatabraziliex() {
    const foxbit = new ccxt.braziliex();
    const market = await foxbit.fetchTicker('BTC/BRL');
    return {
        name: 'braziliex',
        cost: 0.005,
        bid: market.bid,
        ask: market.ask
    };
};

module.exports = fetchDatabraziliex;