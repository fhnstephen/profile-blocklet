import path from 'path';
import { Sequelize } from 'sequelize-typescript';

// Path to SQLite file
const defaultDbPath = path.resolve(__dirname, '../../data/db.sqlite');
export const dbPath = process.env.DB_PATH || defaultDbPath;

// Initialize SQLite database
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath, // Path to SQLite file
  models: [path.resolve(__dirname, '../models')], // Register models
});
