import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { playlistRouter } from './playlist-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/playlists', playlistRouter);

export default router;
