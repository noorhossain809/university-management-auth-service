import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import Server from 'http';

process.on('uncaughtException', error => {
  console.log(
    'Uncought exceptinal is detected, we are closing our server.......'
  );
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connected successfully!!!');
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to database connect!');
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled rejection is detected, we are closing our server.......'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
