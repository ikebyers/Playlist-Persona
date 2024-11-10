import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface Song {
  songTitle: string;
  artistName: string;
  url: string;
}

interface PlaylistAttributes {
  id: number;
  title: string;
  songList: Song[];
  assignedUserId?: number;
}


interface PlaylistCreationAttributes extends Optional<PlaylistAttributes, 'id'> {}

export class Playlist extends Model<PlaylistAttributes, PlaylistCreationAttributes> implements PlaylistAttributes {
  public id!: number;
  public title!: string;
  public songList!: Song[];
  public assignedUserId!: number;

  // associated Volunteer model
  public readonly assignedUser?: User;

  // date it is created:
  public readonly createdAt!: Date;
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
      songList: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'playlists',
      sequelize,
    }
  );

  return Playlist;
}
