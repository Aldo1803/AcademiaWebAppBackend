import express from 'express';
import authMiddleware from '../services/Auth.js';
import LessonController from '../controllers/Lesson.js';

const router = express.Router();

router.post('/lessons/:id', authMiddleware, LessonController.addLesson);
router.get('/lessons/:id', authMiddleware, LessonController.getLesson);

export default router;