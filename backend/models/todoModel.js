import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
}, {
  timestamps: true,
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo;