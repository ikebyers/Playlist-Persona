import { User } from '../models/index.js';
// import { Playlist } from '../models/playlist.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { uName:'julian Alsun', username: 'JollyGuru', email: 'jolly@guru.com', password: 'password' },
      {
        uName:'Sunny AnBono',
        username: 'SunnyScribe',
        email: 'sunny@scribe.com',
        password: 'password',
      },
      {
        uName:'Starry Fox',
        username: 'RadiantComet',
        email: 'radiant@comet.com',
        password: 'password',
      },
    ],
    { individualHooks: true }
  );
};
