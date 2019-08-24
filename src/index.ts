import foxbit from './exchange/foxbit';
import { MercadoBitcoin } from './exchange/mercado';
import braziliex from './exchange/braziliex';
import negociecoins from './exchange/negociecoins';

import checkArb from './check-arb';


async function OndeCompra() {
    console.log('Procurando oportunidades....');
    try {
        let mercadoBitcoin = new MercadoBitcoin();

        Promise.all([
            // await foxbit(),
            // await flowbtc(), Erro 403
            await mercadoBitcoin.fetchTicker(),
            await braziliex(),
            await negociecoins()
        ])
            .then((response) => {
                checkArb(response);
                console.log('Aguardando ts minuto para procurar oportunidade novamente.');
                console.log('---------------------------------------------------------')
                setTimeout(OndeCompra, 60000);
            })
            .catch((err) => {
                console.error(`Erro: ${err.message}`);
                console.log('Aguardando 1 minuto para procurar oportunidade novamente.')
                setTimeout(OndeCompra, 60000);
            });
    } catch (err) {
        console.error(err.message);
        setTimeout(OndeCompra, 120000);
    }
}

OndeCompra();