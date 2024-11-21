import { Profile } from '../models/profile';
import logger from './logger';
import { dbPath, sequelize } from './sequelize';

export async function syncDatabase() {
  // Sync database and seed data
  try {
    await sequelize.sync({ force: false }); // Do not drop existing tables
    logger.log('Database & tables created at:', dbPath);
  } catch (err) {
    logger.error('Failed to initialize database:', err);
  }
}

export { sequelize, Profile };
