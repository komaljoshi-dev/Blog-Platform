import express from 'express';
import {authenticateToken} from '../middleware/authmw.js';
import {
    getAllPosts, 
    getSinglePost, 
    createPost, 
    updatePost, 
    deletePosts,
    getUserPosts
} from '../controllers/postcontrol.js';

const router= express.Router();

//public routes
router.get( '/',  getAllPosts);
router.get( '/:id', getSinglePost);

//protected routes
router.post( '/', authenticateToken, createPost);
router.put( '/:id', authenticateToken, updatePost);
router.delete ( '/:id', authenticateToken, deletePosts);
router.get( '/user/profile', authenticateToken, getUserPosts);

export default router;