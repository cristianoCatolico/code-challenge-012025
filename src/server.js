require('dotenv').config();

const express = require('express')
const cors = require('cors');
const tickerRoutes = require('./routes/tickersRoute')
const config = require('./utils/config/config');
const logger = require('./utils/logger/loggerCaller');

const app = express()

app.use(express.json());
app.use(cors()); 
app.use(express.static('public'));

app.use('/api', tickerRoutes);


const server = app.listen(config.web.port, () => {
    const { port } = server.address();
    const message = `Server running.`;
    const content = `URL: http://localhost:${port}.\nEnviroment: ${config.enviroment}.`;
    logger.info(message, logger.types.SYSTEM, 'express', 'runServer', content);
  });
