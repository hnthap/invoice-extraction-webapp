import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';
import uploadMiddleware from '../middlewares/upload.js';

const imageRouter = express.Router();

imageRouter.post('/generate-image', userAuth, uploadMiddleware, generateImage);

export default imageRouter;