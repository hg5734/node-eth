import * as express from 'express';
import auth from './auth';
import app from './app';

const router = express.Router();

router.use('/auth', auth);
router.use('/app', app);

export default router;
