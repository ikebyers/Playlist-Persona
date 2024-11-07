import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { PlaylistFactory } from './playlist.js'

const User = UserFactory(sequelize);
const Playlist = PlaylistFactory(sequelize);

User.hasMany(Playlist, {foreignKey:'assignedUserId'});
Playlist.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { User, Playlist };