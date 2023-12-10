import Chat from '../models/Chat.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const ChatController = {

    async createChat(req, res) {
        try {
            const newChat = new Chat({user: req.userId});

            const savedChat = await newChat.save();

            res.json(savedChat);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getChat(req, res) {
        try {
            const { id } = req.params;
            const chat = await Chat.findById(id);
            res.status(200).json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getChatsByUser(req, res) {
        try {
            const { userId } = req.params;
            const chats = await Chat.find({ userId });
            res.status(200).json(chats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async deleteChat(req, res) {
        try {
            const { id } = req.params;
            const deletedChat = await Chat.findByIdAndDelete(id);
            res.status(200).json(deletedChat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async addMessage(req, res) {
        try {
            const { id } = req.params;
            const { prompt } = req.body;
            const chat = await Chat.findById(id);

            chat.messages.push(prompt);

            const response = await openai.chat.completions.create({
                messages: [{role: 'user', content: prompt, }],
                model: "gpt-3.5-turbo"
            });

            console.log(response.choices[0].message.content);
            chat.messages.push(response.choices[0].message.content);

            await chat.save();

            res.status(200).json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }



};

export default ChatController;