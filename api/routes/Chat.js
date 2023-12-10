
import express from 'express';
import authMiddleware  from '../services/Auth.js';
import ChatController from '../controllers/Chat.js';

const router = express.Router();



router.get('/chats', authMiddleware, ChatController.getChatsByUser);
router.get('/chats/:id', authMiddleware, ChatController.getChat);
router.delete('/chats/:id', authMiddleware, ChatController.deleteChat);
router.post('/chats', authMiddleware, ChatController.createChat);
router.post('/chats/:id/', authMiddleware, ChatController.addMessage);
router.get('/test', authMiddleware, (req, res) => {
    res.send('Hello World!');
})



export default router;



