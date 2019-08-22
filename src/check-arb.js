"use strict";
var lodash = require('lodash');
var fs = require('fs');
var beep = require('beepbeep');

function checkOpportunity(prices) {

    let amount = 1

    SaveFile(prices);

    var bestBid = lodash.maxBy(prices, function(item) { return item.bid })
    var bestAsk = lodash.minBy(prices, function(item) { return item.ask })

    console.log(`Melhor bid (preço de venda): ${bestBid.bid.toFixed(2)}`);
    console.log(`Melhor ask (preço de compra): ${bestAsk.ask.toFixed(2)}`);


    if (bestBid.bid > bestAsk.ask) {

        console.log('Possíveis Oportunidades. Verificando custo para comprar ' + amount + ' bitcoins....');

        var priceDifference = (bestBid.bid * amount) - (bestAsk.ask * amount);
        console.log('Ganha-se na arbitragem: R$', priceDifference.toFixed(2),
            'comprando na', bestAsk.name, 'por: R$', bestAsk.ask.toFixed(2),
            'e vendendo na', bestBid.name, 'por: R$', bestBid.bid.toFixed(2));


        var buyCost = bestAsk.ask * amount * bestAsk.cost;
        // console.log('Custo Compra: ', buyCost);
        var sellCost = bestBid.bid * amount * bestBid.cost;
        // console.log('Custo Venda: ', sellCost);
        var totalCost = buyCost + sellCost;
        console.log('Custo Total de taxas: ', totalCost.toFixed(2));

        console.log('O que dá uma diferença de', (priceDifference.toFixed(2) - totalCost.toFixed(2)).toFixed(2));

        if (totalCost < priceDifference) {
            console.log('Compre na ', bestAsk.name, 'e venda na ', bestBid.name);
            beep(2)
        } else {
            console.log('O custo não justifica', '\n\n');
        }

    } else {
        console.log('Não há oportunidades', '\n\n')
    }
}

function SaveFile(prices) {
    // console.log(prices);
    var txtPrices = JSON.stringify(prices);
    fs.writeFile('src/lastFetchedData.json', txtPrices, 'utf-8', function(err) {
        if (err) throw err;
        // console.log('The file has been saved!');
    })
}

module.exports = checkOpportunity;



//Teste
// checkOpportunity(
// 	[
// 	   {
// 	      "name":"foxbit",
// 	      "cost":0.005,
// 	      "bid":9000,
// 	      "ask":8000.01
// 	   },
// 	   {
// 	      "name":"mercado",
// 	      "cost":0.007,
// 	      "bid":12196,
// 	      "ask":13229.8
// 	   },
// 	   {
// 	      "name":"flowbtc",
// 	      "cost":0.0035,
// 	      "bid":11800,
// 	      "ask":11945
// 	   }
// 	]
// )