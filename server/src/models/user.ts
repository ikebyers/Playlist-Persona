import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  uName: string;
  email: string;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public uName!: string;
  public email!: string;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      },
    }
  );

  return User;
}