"use strict";
var lodash = require('lodash');
var fs = require('fs');
var beep = require('beepbeep');
const state = require('./state.js')

function checkOpportunity(prices, pContent) {

    SaveFile(prices);

    var vSaldo = parseFloat(pContent.saldos[0].saldo);
    var vNumeroArbitragens = pContent.saldos[0].numeroarbitragens;

    let vContent = pContent;

    var bestBid = lodash.maxBy(prices, function(item) { return item.bid })
    var bestAsk = lodash.minBy(prices, function(item) { return item.ask })

    let amount = (vSaldo / bestAsk.ask);

    console.log('  ');
    console.log(`  Melhor ask (preço de compra): ${bestAsk.ask.toFixed(2)} na ${bestAsk.name}`);
    console.log(`  Melhor bid (preço de venda) : ${bestBid.bid.toFixed(2)} na ${bestBid.name}`);


    if (bestBid.bid > bestAsk.ask) {
        console.log('  ');

        console.log('  Possíveis Oportunidades.');
        console.log('  Verificando custo para comprar ' + amount.toFixed(6) + ' bitcoins com Saldo de ', vSaldo);

        var priceDifference = (bestBid.bid * amount) - (bestAsk.ask * amount);
        console.log('  comprando  por:         R$', bestAsk.ask.toFixed(2), 'na', bestAsk.name);
        console.log('  e vendendo por:         R$', bestBid.bid.toFixed(2), 'na', bestBid.name);
        console.log('  Ganha-se na arbitragem: R$  ', priceDifference.toFixed(2));


        var buyCost = bestAsk.ask * amount * bestAsk.cost;
        // console.log('  Custo Compra: ', buyCost);
        var sellCost = bestBid.bid * amount * bestBid.cost;
        // console.log('  Custo Venda: ', sellCost);
        var totalCost = buyCost + sellCost;
        console.log('  Custo Total de taxas:   R$  ', totalCost.toFixed(2));

        var diferenca = (priceDifference - totalCost);
        var percentual = ((diferenca / bestAsk.ask) * 100);

        console.log('  O que dá uma diferença: R$  ', diferenca.toFixed(2), ' - ', percentual.toFixed(4), '%');

        if (totalCost < priceDifference) {
            vSaldo = (vSaldo + diferenca);
            vNumeroArbitragens = (vNumeroArbitragens + 1);

            vContent.saldos[0].saldo = vSaldo.toFixed(2);
            vContent.saldos[0].numeroarbitragens = vNumeroArbitragens;
            vContent.arbitragens.push({
                'codigo': vNumeroArbitragens,
                'compra': bestAsk.name,
                'venda': bestBid.name,
                'valorcompra': bestAsk.ask.toFixed(2),
                'valorvenda': bestBid.bid.toFixed(2),
                'investimento': vSaldo.toFixed(2),
                'custos': totalCost.toFixed(2),
                'lucro': priceDifference.toFixed(2),
                'porcentagem': percentual.toFixed(4)
            });
            state.save(vContent);

            console.log('  Compre na ', bestAsk.name, 'e venda na ', bestBid.name);
            beep(2)
        } else {
            console.log('  O custo não justifica', '\n\n');
        }

    } else {
        console.log('  Não há oportunidades', '\n\n');
    }
    return vContent;
}


function SaveFile(prices) {
    // console.log(prices);
    var txtPrices = JSON.stringify(prices);
    fs.writeFile('dados/lastFetchedData.json', txtPrices, 'utf-8', function(err) {
        if (err) throw err;
        // console.log('  The file has been saved!');
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