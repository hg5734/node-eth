import * as path from 'path';

/**
 *  import .env variables
 */

require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
});

export const vars = {
  serviceName: process.env.SERVICE_NAME,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  basePath: '/api/v1',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiryTime: 1000, //jwt token expiry time
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'combined',
  salt: process.env.SALT,
  database: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DB
  },
  networkUrl: process.env.CHIN_NETWORK_URL
};

export default {
  vars
};
