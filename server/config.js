const path = require('path');

const config = {
  ROOT_DIR: __dirname,
  URL_PORT: process.env.PORT || 3000,
  URL_PATH: 'http://localhost',
  BASE_VERSION: '',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),
  PROJECT_DIR: __dirname,
};
config.ORIGIN = process.env.NODE_ENV === "production" ? 'https://main.d2op9632wl9qv6.amplifyapp.com/' : "http://localhost:8000";
config.OPENAPI_YAML = path.join(config.ROOT_DIR, 'api', 'openapi.yaml');
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
config.FILE_UPLOAD_PATH = path.join(config.PROJECT_DIR, 'uploaded_files');
config.DATABASE = 'postgres';
config.DATABASE_USERNAME = process.env.DB_USERNAME;
config.DATABASE_PASSWORD = process.env.DB_PASSWORD;
config.DATABASE_OPTIONS = {
  host: process.env.DB_HOST,
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: 'America/Los_Angeles'
}

module.exports = config;
