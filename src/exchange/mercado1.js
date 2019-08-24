"use strict";
const ccxt = require('ccxt');


async function fetchDatamercado() {
    const mercado = new ccxt.mercado();
    const market = await mercado.fetchTicker('BTC/BRL');
    // const Tickers = await foxbit.fetchOrderBook('BTC/BRL');

    // console.log(Tickers.asks);

    return {
        name: 'mercado',
        cost: 0.005,
        bid: market.bid,
        ask: market.ask
    };
};

module.exports = fetchDatamercado;