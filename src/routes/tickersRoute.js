// Imports
const sendResponse = require('../controllers/sendResponse');
const {
    getTickersController,
    geTickerTradeController,
} = require('../controllers/ticker/tickerController');

const express = require('express');
const router = express.Router();

router.get('/tickers', async (req, res) => {
  return sendResponse(req, res, await getTickersController(req.query));
});

router.get('/tickers/:tickerName/price', async (req, res) => {
  return sendResponse(req, res, await geTickerTradeController(req.params));
});


// Exports
module.exports = router;