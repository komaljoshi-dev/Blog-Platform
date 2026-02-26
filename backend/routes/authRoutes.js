import express from 'express';
import { authenticateToken } from '../middleware/authmw.js';
import {register , login, getCurrentUser} from '../controllers/authcontrol.js';

const router= express.Router();

router.post( '/register', register);
router.post( '/login', login);

router.get( '/me', authenticateToken, getCurrentUser);

export default router;