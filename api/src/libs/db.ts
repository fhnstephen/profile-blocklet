import path from 'path';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

import logger from './logger';

// Define Profile attributes
interface ProfileAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const dbPath = path.resolve(__dirname, '../../../db/database.sqlite');

// Define optional attributes for creation
type ProfileCreationAttributes = Optional<ProfileAttributes, 'id'>;

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath, // Path to SQLite file
});

// Define Profile model
class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
  public id!: number;

  public name!: string;

  public email!: string;

  public phone!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

// Initialize Profile schema
Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true, // Validate email format
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
  },
);

// Seed data function
async function seedDatabase() {
  // Check if any profiles already exist
  const count = await Profile.count();
  if (count > 0) {
    logger.log('Database already seeded.');
    return;
  }

  // Insert default profiles
  const profile = { name: 'HelloBlocklet', email: 'HelloBlocklet@example.com', phone: '123-456-7890' };

  await Profile.create(profile); // Insert multiple rows
  logger.log('Database seeded with initial profiles.');
}

// Sync database and seed data
sequelize
  .sync({ force: false }) // Do not drop existing tables
  .then(() => {
    logger.log('Database & tables created at:', dbPath);
    return seedDatabase(); // Seed the database
  })
  .catch((err) => {
    logger.error('Failed to initialize database:', err);
  });

export { sequelize, Profile };
