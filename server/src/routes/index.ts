import { Router } from 'express';
import { userRouter } from './api/user-routes.js';
import { playlistRouter } from './api/playlist-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/playlists', playlistRouter);

export default router;