import mongoose from 'mongoose';


const lessonSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
