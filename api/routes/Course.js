import express from 'express';
import authMiddleware from '../services/Auth.js';
import CourseController from '../controllers/Course.js';

const router = express.Router();

router.post('/courses', authMiddleware, CourseController.createCourse);
router.get('/courses', authMiddleware, CourseController.getAllCourses);
router.get('/courses/:id', authMiddleware, CourseController.getCourse);
router.put('/courses/:id', authMiddleware, CourseController.updateCourse);
router.delete('/courses/:id', authMiddleware, CourseController.deleteCourse);

export default router;


