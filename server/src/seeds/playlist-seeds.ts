import { Playlist } from '../models/index.js';
// import { Playlist } from '../models/playlist.js';

export const seedPlaylist = async () => {
  await Playlist.bulkCreate(
    [
      {
        title: 'Melow Play',
        songList: [
          {
            "songTitle": "Bitter Sweet Symphony",
            "artistName": "The Verve",
            "url": "1lyu1KKwC74"
          },
          {
            "songTitle": "Peach",
            "artistName": "Brothers Osborne",
            "url": "TLbnWr1-Qsc"
          },
          {
            "songTitle": "Such a Simple Thing",
            "artistName": "Ray LaMontagne",
            "url": "6POcQ5wiUa4"
          },
          {
            "songTitle": "Electric Feel",
            "artistName": "MGMT",
            "url": "MmZexg8sxyk"
          },
          {
            "songTitle": "On Hold",
            "artistName": "The xx",
            "url": "blJKoXWlqJk"
          },
          {
            "songTitle": "Home",
            "artistName": "Edward Sharpe & The Magnetic Zeros",
            "url": "DHEOF_rcND8"
          },
          {
            "songTitle": "Budapest",
            "artistName": "George Ezra",
            "url": "4YCkAVokE84"
          },
          {
            "songTitle": "Ophelia",
            "artistName": "The Lumineers",
            "url": "pCDPpHLOw6A"
          },
          {
            "songTitle": "Lost in Yesterday",
            "artistName": "Tame Impala",
            "url": "C7VlC0QjdHU"
          },
          {
            "songTitle": "Riptide",
            "artistName": "Vance Joy",
            "url": "lYoWuaw5nSk"
          }
        ],
        assignedUserId: 1,
      },
      {
        title: 'My Playlist2',
        songList: [
          {
            "songTitle": "Bitter Sweet Symphony",
            "artistName": "The Verve",
            "url": "1lyu1KKwC74"
          },
          {
            "songTitle": "Peach",
            "artistName": "Brothers Osborne",
            "url": "TLbnWr1-Qsc"
          },
          {
            "songTitle": "Such a Simple Thing",
            "artistName": "Ray LaMontagne",
            "url": "6POcQ5wiUa4"
          },
          {
            "songTitle": "Electric Feel",
            "artistName": "MGMT",
            "url": "MmZexg8sxyk"
          },
          {
            "songTitle": "On Hold",
            "artistName": "The xx",
            "url": "blJKoXWlqJk"
          },
          {
            "songTitle": "Home",
            "artistName": "Edward Sharpe & The Magnetic Zeros",
            "url": "DHEOF_rcND8"
          },
          {
            "songTitle": "Budapest",
            "artistName": "George Ezra",
            "url": "4YCkAVokE84"
          },
          {
            "songTitle": "Ophelia",
            "artistName": "The Lumineers",
            "url": "pCDPpHLOw6A"
          },
          {
            "songTitle": "Lost in Yesterday",
            "artistName": "Tame Impala",
            "url": "C7VlC0QjdHU"
          },
          {
            "songTitle": "Riptide",
            "artistName": "Vance Joy",
            "url": "lYoWuaw5nSk"
          }
        ],
        assignedUserId: 2,
      },
      {
        title: 'Howd About That',
        songList: [
          {
            "songTitle": "Bitter Sweet Symphony",
            "artistName": "The Verve",
            "url": "1lyu1KKwC74"
          },
          {
            "songTitle": "Peach",
            "artistName": "Brothers Osborne",
            "url": "TLbnWr1-Qsc"
          },
          {
            "songTitle": "Such a Simple Thing",
            "artistName": "Ray LaMontagne",
            "url": "6POcQ5wiUa4"
          },
          {
            "songTitle": "Electric Feel",
            "artistName": "MGMT",
            "url": "MmZexg8sxyk"
          },
          {
            "songTitle": "On Hold",
            "artistName": "The xx",
            "url": "blJKoXWlqJk"
          },
          {
            "songTitle": "Home",
            "artistName": "Edward Sharpe & The Magnetic Zeros",
            "url": "DHEOF_rcND8"
          },
          {
            "songTitle": "Budapest",
            "artistName": "George Ezra",
            "url": "4YCkAVokE84"
          },
          {
            "songTitle": "Ophelia",
            "artistName": "The Lumineers",
            "url": "pCDPpHLOw6A"
          },
          {
            "songTitle": "Lost in Yesterday",
            "artistName": "Tame Impala",
            "url": "C7VlC0QjdHU"
          },
          {
            "songTitle": "Riptide",
            "artistName": "Vance Joy",
            "url": "lYoWuaw5nSk"
          }
        ],
        assignedUserId: 3,
      },
    ],
    { individualHooks: true }
  );
};
