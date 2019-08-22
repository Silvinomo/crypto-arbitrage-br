"use strict";
const ccxt = require('ccxt');


async function fetchDataFlowBTC() {
    const flowbtc = new ccxt.flowbtc();
    const market = await flowbtc.fetchTicker('BTC/BRL');
    return {
        name: 'flowbtc',
        cost: 0.0035,
        bid: market.bid.toFixed(4),
        ask: market.ask.toFixed(4)
    };
};

module.exports = fetchDataFlowBTC;