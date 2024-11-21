import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'profiles', // Table name in the database
  timestamps: true, // Enable createdAt and updatedAt
})
export class Profile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number; // Primary key

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string; // Name field

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Email must be unique
    validate: {
      isEmail: true, // Validate email format
    },
  })
  email!: string; // Email field

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string; // Phone field

  @CreatedAt
  override createdAt!: Date; // Timestamp for record creation

  @UpdatedAt
  override updatedAt!: Date; // Timestamp for last record update
}

export default Profile;
