import path from 'path';
import { Sequelize } from 'sequelize-typescript';

// Path to SQLite file
export const dbPath = path.resolve(__dirname, '../../../db/database.sqlite');

// Initialize SQLite database
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath, // Path to SQLite file
  models: [path.resolve(__dirname, '../models')], // Register models
});
