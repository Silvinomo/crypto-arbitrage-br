"use strict";
const foxbit = require('./exchange/foxbit');
const flowbtc = require('./exchange/flowbtc');
const mercado = require('./exchange/mercado1');
const braziliex = require('./exchange/braziliex');
const negociecoins = require('./exchange/negociecoins');

const checkArb = require('./check-arb');
const state = require('./state.js')

const content = state.load();

async function fetchData(pContent) {

    console.log('  Procurando oportunidades....');
    try {
        Promise.all([
                // await foxbit(),
                // await flowbtc(), Erro 403
                await mercado(),
                await braziliex(),
                await negociecoins()
            ])
            .then((response) => {
                pContent = checkArb(response, pContent);
                console.log('  Aguardando 1 minuto para procurar oportunidade novamente.');
                console.log('  ---------------------------------------------------------')
                setTimeout(fetchData, 60000, pContent);
            })
            .catch((err) => {
                console.error(`Erro: ${err.message}`);
                console.log('  Aguardando 1 minuto para procurar oportunidade novamente.')
                setTimeout(fetchData, 60000, pContent);
            });
    } catch (err) {
        console.error(err.message);
        setTimeout(fetchData, 120000, pContent);
    }
}

fetchData(content);