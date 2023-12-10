import mongoose from 'mongoose';


const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
  ,
  description: {
    type: String,
    required: true
  },
  lessons: [{
    type: mongoose.Schema.Types.Mixed
  }],
});

courseSchema.pre('save', function (next) {
  if (!this.lessons) {
    this.lessons = [];
  }
  next();
});

export default mongoose.model('Course', courseSchema);
