"use strict";
const ccxt = require('ccxt');


async function fetchDataMercadoBitcoin() {
    const mercado = new ccxt.mercado();
    const market = await mercado.fetchTicker('BTC/BRL');
    return {
        name: 'mercado',
        cost: 0.007,
        bid: market.bid,
        ask: market.ask
    };
};

module.exports = fetchDataMercadoBitcoin;