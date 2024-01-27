import asyncHandler from "../middleware/asyncHandler.js"
import Task from '../models/taskModel.js'


// @desc    Create a Task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const {projectId, name} = req.body

  if(!req.body.projectId) {
		res.status(400)
		throw new Error('Please Provide projectId field')
	}
  if(!req.body.name) {
		res.status(400)
		throw new Error('Please provide name field')
	}

  const task = await Task.create({
    projectId,
    name,
  })

	res.status(200).json(task)
})

// @desc    Get Project's Tasks
// @route   GET /api/tasks/:id
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({projectId: req.params.id})

  if (tasks) {
    const sortedTasks = tasks.sort((a, b) => a.order - b.order) 
    res.status(200).json(sortedTasks)
  } else {
    res.status(404)
    throw new Error('Tasks Not Found')
  }
})

// @desc    Update a Task
// @route   PUT /api/tasks
// @access  Private
const updateTask = asyncHandler(async (req, res) => {

  const taskId = req.body.taskId;
  const order = Number(req.body.order);

  const {name, desc} = req.body

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId },
    { $set: { order, name, desc } },
    { new: true }
  );

  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(404)
    throw new Error('Task not found or not updated properly');
  }
})



// @desc    Delete a Task
// @route   DELETE /api/tasks
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.body.taskId)

  if (task) {
    res.status(200).json({message: 'Task Deleted'})
  } else {
    res.status(404)
    throw new Error('Task Not Found')
  }
})




export {
  createTask,
  getTasks,
  updateTask,
  deleteTask
}