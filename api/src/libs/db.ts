import { Profile } from '../models/profile';
import logger from './logger';
import seedDatabase from './seed';
import { dbPath, sequelize } from './sequelize';

export function syncDatabase() {
  // Sync database and seed data
  return sequelize
    .sync({ force: false }) // Do not drop existing tables
    .then(() => {
      logger.log('Database & tables created at:', dbPath);
      return seedDatabase(); // Seed the database
    })
    .catch((err) => {
      logger.error('Failed to initialize database:', err);
    });
}

export { sequelize, Profile };
