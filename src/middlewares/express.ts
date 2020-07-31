import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import morgan from '../utils/morgan';

import routes from '../routes/v1/index';
import errorHandler from './error';

/**
 * Express instance
 * @public
 */
const app = express();

// log all requests
app.use(morgan);


//  Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '100mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000
  })
);

// gzip compression
app.use(compress());

// enable CORS - Cross Origin Resource Sharing
// TODO : Define CORS policy
app.use(cors());

// middleware for selected language
app.disable('x-powered-by');

// mount api v1 routes
app.use('/api/v1', routes);

// if error is not an instanceOf CustomError, convert it.
app.use(errorHandler.handle);

// catch 404 and forward to error handler
app.use(errorHandler.notFound);

export default app;
