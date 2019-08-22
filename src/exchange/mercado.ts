import ccxt from 'ccxt';


export class MercadoBitcoin {
    Exchenge = new ccxt.mercado();

    constructor() { }

    public async fetchTicker() {
        const market = await this.Exchenge.fetchTicker('BTC/BRL');
        // const Tickers = await mercado.fetchOrderBook('BTC/BRL');

        // console.log(Tickers.bids);

        return {
            name: 'mercado',
            cost: 0.007,
            bid: market.bid,
            ask: market.ask
        };
    };

}