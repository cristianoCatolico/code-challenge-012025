const axios = require('axios'); 
const config = require('../utils/config/config')
const logger = require('../utils/logger/loggerCaller')

async function getTickers(limit=10, cursor) {
    let url = ''
    if (cursor){
      console.log(cursor)
      url=`${config.application.polygonURL}/v3/reference/tickers?cursor=${cursor}&apiKey=`
    } else {
      url =`${config.application.polygonURL}/v3/reference/tickers?market=stocks&active=true&limit=${limit}&apiKey=`  
    }
    
    try {
      const response = await axios.get(`${url}${config.application.polygonAPIKey}`);
      if (response?.data?.results === null) {
        throw [];
      }
      const params = new URL(response.data.next_url).searchParams;
      return {
        status: 200,
        data: response.data.results,
        next: params.get('cursor')
      };
    } catch (error) {
      logger.error(
        `Response on url ${url}`,
                logger.types.USER,
                'endpoint',
                'response',
                `Response: ${JSON.stringify(error, null, 2)}`
      )
      return [];
    }
  }

async function getLastTrade(ticker) {
    const url =`${config.application.polygonURL}/v2/last/trade/${ticker}?apiKey=`
    try {
      const response = await axios.get(`${url}${config.application.polygonAPIKey}`);
      if (response?.data?.results === null) {
        throw {
          p: 129.8473 
        };
      }
      return response.data;
    } catch (error) {
      logger.error(
        `Response on url ${url}`,
                logger.types.USER,
                'endpoint',
                'response',
                `Response: ${JSON.stringify(error, null, 2)}`
      )
      return {
        p: 129.8473 * Math.floor(Math.random() * 4)
      };;
    }
  }


  async function getPreviousClose(ticker) {
    const url = `${config.application.polygonURL}/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=`;
    try {
      const response = await axios.get(`${url}${config.application.polygonAPIKey}`);
      if (response?.data?.resultsCount !== 1) {
        throw [];
      }
      return response.data.results[0];
    } catch (error) {
      logger.error(
        `Response on url ${url}`,
                logger.types.USER,
                'endpoint',
                'response',
                `Response: ${JSON.stringify(error, null, 2)}`
      )
      return [];
    }
  }

  module.exports = {
    getLastTrade,
    getPreviousClose,
    getTickers
  }