import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './api/routes/User.js';
import lessonRoutes from './api/routes/Lesson.js';
import courseRoutes from './api/routes/Course.js';
import chatRoutes from './api/routes/Chat.js';


const app = express();
dotenv.config();
// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to allow cross-origin requests
app.use(cors());

// Routes
app.use('/api', userRoutes);
app.use('/api', lessonRoutes);
app.use('/api', courseRoutes);
app.use('/api', chatRoutes);


// Test route
app.get('/test', (req, res) => {
    res.send('This is a test route');
});

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nbvctsf.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });


