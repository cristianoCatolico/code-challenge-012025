
const logger = require('../utils/logger/loggerCaller');

module.exports = (req, res, body) => {
    // Logs
    if (body.status !== 500) {
      logger.info(
        `Response on endpoint [${req.method}]:${req.originalUrl}`,
        logger.types.USER,
        'endpoint',
        'response',
        `Response: ${JSON.stringify(body, null, 2)}`
      );
    } else {
      logger.error(
        `Response on endpoint [${req.method}]:${req.originalUrl}`,
        logger.types.USER,
        'endpoint',
        'response',
        `Response: ${JSON.stringify(body, null, 2)}\nError: ${body?.data}`
      );
    }
  
    // Send response
    res.status(body.status).send(body);
  };