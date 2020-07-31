/* eslint-disable import/prefer-default-export */
import * as mongoose from 'mongoose';
import { vars } from '../config/vars';
import logger from '../utils/logger';

const { database } = vars;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
const db = mongoose.connection;

db.once('open', () => {
  logger.info('db connection made !!!!');
});
export const connection = () => {
  mongoose.connect(`mongodb://${database.host}:${database.port}/${database.db}`, {
    keepAlive: 1,
    useNewUrlParser: true
  });
  return mongoose.connection;
};
