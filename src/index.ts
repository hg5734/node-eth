import app from './middlewares/express';
import logger from './utils/logger';
import { vars } from './config/vars';
import { connection} from './database/index';
const { env, port } = vars;
connection();
import './bootstrap'
/**
 * It starts the server on port
 */
class Server {
  static start() {
    
    // listen to requests
    app.listen(port, () => {
      logger.info('server started on port %s for environment %s', port, env);
    });
  }
}

/**
 * Start Server
 * @public
 */
Server.start();
