"use strict";
const ccxt = require('ccxt');

async function fetchDataFoxBit() {
    const foxbit = new ccxt.foxbit();
    const market = await foxbit.fetchTicker('BTC/BRL');
    return {
        name: 'foxbit',
        cost: 0.005,
        bid: market.bid,
        ask: market.ask
    };
};

module.exports = fetchDataFoxBit;