import { Router } from 'express';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/playlists', userRouter);

export default router;
