import express from 'express';
import type { Request, Response } from 'express';
import { User, Playlist } from '../../models/index.js';

 const router = express.Router();

//  GET /playlist - Get all playlists
router.get('/', async (_req: Request, res: Response) => {
  try {
    const playlists = await Playlist.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['uName'], //Include only the uName attribute
        },
      ],
    });
    res.json(playlists);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET /playlist/:id - Get work by user ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['uName'], //Include only the uName attribute
        },
      ],
    });
    if(playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({
        message: 'Playlist not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST /playlist - Create new playlist
router.post('/', async (req: Request, res: Response) => {
  const { title, timeStamp, songList, assignedUserId } = req.body;
  try {
    const newPlaylist = await Playlist.create({
      title, timeStamp, songList, assignedUserId
    });
    res.status(201).json(newPlaylist);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// PUT /Playlists/:id - Update plyalist by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, timeStamp, songList, assignedUserId } = req.body;
  try {
    const plyalist = await Playlist.findByPk(id);
    if(plyalist) {
      plyalist.title = title;
      plyalist.timeStamp = timeStamp;
      plyalist.songList = songList;
      plyalist.assignedUserId = assignedUserId;
      await plyalist.save();
      res.json(plyalist);
    } else {
      res.status(404).json({
        message: 'Plyalist not found'
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE /playlist/:id - Delete playlists by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const plyalist = await Playlist.findByPk(id);
    if(plyalist) {
      await plyalist.destroy();
      res.json({ message: 'Playlist deleted' });
    } else {
      res.status(404).json({
        message: 'Playlist not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

export { router as playlistRouter };
