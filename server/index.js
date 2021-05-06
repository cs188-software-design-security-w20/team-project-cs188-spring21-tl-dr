const config = require('./config');
const logger = require('./logger');

// Set up environment variables. Place in variables in .env file at root directory (i.e. at /server/.env).
require('dotenv').config();

const ExpressServer = require('./expressServer');

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error('Express Server failure', error.message);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
