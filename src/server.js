require('dotenv').config();

const express = require('express')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const tickerRoutes = require('./routes/tickersRoute')
const config = require('./utils/config/config');
const logger = require('./utils/logger/loggerCaller');

const app = express()

app.use(express.json()); // Format Json Data
app.use(cors()); // Allow comunication of all origins
app.use(express.static('public')); // Allow static files on public (For Swagger)

app.use('/api', tickerRoutes);


const server = app.listen(config.web.port, () => {
    const { port } = server.address();
    const message = `Server running.`;
    const content = `URL: http://localhost:${port}.\nEnviroment: ${config.enviroment}.`;
    logger.info(message, logger.types.SYSTEM, 'express', 'runServer', content);
  });


/*
https://codewithmatt.hashnode.dev/understanding-the-building-blocks-of-a-web-application-routes-controllers-services-repositories-and-databases
https://github.com/cerciber/node-general-architecture/blob/develop/src/utils/statics/paths.js
https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
https://medium.com/@bjprajapati381/using-winston-for-logging-in-node-js-applications-d15302947c28
https://dev.to/cuongnp/swagger-nodejs-express-a-step-by-step-guide-4ob
https://github.com/danielschmitz/express-solid/blob/master/src/api/foo.js
*/