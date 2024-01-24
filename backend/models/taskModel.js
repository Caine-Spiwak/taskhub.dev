import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  order: {
    type: Number,
  },
}, {
  timestamps: true,
})

const Task = mongoose.model('Task', taskSchema)

export default Task;