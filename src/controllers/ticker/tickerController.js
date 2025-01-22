const {
    getTickers,
    getLastTrade,
    getPreviousClose
} = require('../../services/tickerService')

async function getTickersController(query) {
    const { limit, cursor } = query;
    const tickerResponse = await getTickers(limit, cursor)
    return tickerResponse
}
async function geTickerTradeController(params) {
    const { tickerName } = params;
    const lastTrade = await getLastTrade(tickerName)
    const prevClose = await getPreviousClose(tickerName)
    
    return {
        status: 200,
        data: {
            price: lastTrade.p || 0,
            priceChange:  lastTrade.p- prevClose.c || 0,
            pricePercentage:  ((lastTrade.p / prevClose.c- 1) * 100) || 0
        }

    }
}

module.exports = {
    getTickersController,
    geTickerTradeController
}