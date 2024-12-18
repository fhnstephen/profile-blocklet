import fallback from '@blocklet/sdk/lib/middlewares/fallback';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv-flow';
import express, { ErrorRequestHandler } from 'express';
import 'express-async-errors';
import { Server } from 'http';
import path from 'path';

import { syncDatabase } from './libs/db';
import logger from './libs/logger';
import routes from './routes';

// needed for blocklet dev client and unit tests
export const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json({ limit: '1 mb' }));
app.use(express.urlencoded({ extended: true, limit: '1 mb' }));
app.use(cors());

const router = express.Router();
router.use('/v1/api', routes);

// versioning health check
router.use('/v1', (_, res) => {
  res.json({ version: 'v1', status: 'running' });
});
app.use(router);

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

if (isProduction) {
  const staticDir = path.resolve(process.env.BLOCKLET_APP_DIR!, 'dist');
  app.use(express.static(staticDir, { maxAge: '30d', index: false }));
  app.use(fallback('index.html', { root: staticDir }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(<ErrorRequestHandler>((err, _req, res, _next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  }));
}
const { name, version } = require('../../package.json');

export function startServer(): Server {
  // Initialize the database
  syncDatabase();

  dotenv.config();

  const port = parseInt(process.env.BLOCKLET_PORT!, 10);

  return app.listen(port, (err?: any) => {
    if (err) throw err;
    logger.info(`> ${name} v${version} ready on ${port}`);
  });
}

const server = process.env.NODE_ENV !== 'test' ? startServer() : null;

// needed for blocklet dev client
export { server };
