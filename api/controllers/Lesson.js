import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

const LessonController = {

    async addLesson (req, res) {
        try {
            const { id } = req.params;
            const { title, videoUrl } = req.body;
            const newLesson = new Lesson({ title, videoUrl });
            const savedLesson = await newLesson.save();
            const course = await Course.findById(id);
            course.lessons.push(savedLesson);
           
            await course.save();
            res.json(savedLesson);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getLesson (req, res) {
        try {
            const { id } = req.params;
            const lesson = await Lesson.findById(id);
            res.status(200).json(lesson);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

};

export default LessonController;