import { Profile } from '../models/profile';
import logger from './logger';
import { sequelize } from './sequelize';

export default async function seedDatabase() {
  try {
    // Ensure the database connection is established
    await sequelize.authenticate();

    // Check if the database already has data
    const count = await Profile.count();
    if (count > 0) {
      logger.log('Database already seeded.');
      return;
    }

    // Insert seed data
    await Profile.create({ name: 'HelloBlocklet', email: 'alice@example.com', phone: '123-456-7890' });
    logger.log('Database seeded with initial profiles.');
  } catch (err) {
    logger.error('Failed to seed database:', err);
  }
}
