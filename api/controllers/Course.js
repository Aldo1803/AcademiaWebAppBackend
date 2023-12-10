import Course from '../models/Course.js';


// Controller methods
const CourseController = {
    
    async createCourse(req, res) {
        try {
            const { title, description } = req.body;

            const newCourse = new Course({ title, description });

            const savedCourse = await newCourse.save();

            res.json(savedCourse);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAllCourses(req, res) {
        try {
            const courses = await Course.find();
            res.status(200).json(courses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getCourse(req, res) {
        try {
            const { id } = req.params;
            const course = await Course.findById(id);
            res.status(200).json(course);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async updateCourse(req, res) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const updatedCourse = await Course.findByIdAndUpdate(id, { title, description }, { new: true });
            res.status(200).json(updatedCourse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async deleteCourse(req, res) {
        try {
            const { id } = req.params;
            const deletedCourse = await Course.findByIdAndDelete(id);
            res.status(200).json(deletedCourse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
   
};

export default CourseController;
