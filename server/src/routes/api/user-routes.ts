import express from 'express';
import type { Request, Response } from 'express';
import { User,Playlist } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
    const { uName, email, username, password } = req.body;
    try {
        const newUser = await User.create({ uName, email, username, password });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { uName, email, username, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.uName = uName;
            user.email = email;
            user.username = username;
            user.password = password;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});
// DELETE /users/:id - Delete a user by id and their associated playlists
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            // Delete playlists associated with the user
            await Playlist.destroy({
                where: {
                    assignedUserId: id // Delete playlists where assignedUserId matches the user's id
                }
            });

            // Now delete the user
            await user.destroy();
            res.json({ message: 'User and associated playlists deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export { router as userRouter };
