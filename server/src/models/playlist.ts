import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface PlaylistAttributes {
  id: number;
  title: string;
  timeStamp: Date;
  songList: string;
  assignedUserId?: number;
}

interface PlaylistCreationAttributes extends Optional<PlaylistAttributes, 'id'> {}

export class Playlist extends Model<PlaylistAttributes, PlaylistCreationAttributes> implements PlaylistAttributes {
  public id!: number;
  public title!: string;
  public timeStamp!: Date;
  public songList!: string;
  public assignedUserId!: number;

  // associated Volunteer model
  public readonly assignedUser?: User;
}

export function PlaylistFactory(sequelize: Sequelize): typeof Playlist {
  Playlist.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeStamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      songList: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'playlists',
      sequelize,
    }
  );

  return Playlist;
}
