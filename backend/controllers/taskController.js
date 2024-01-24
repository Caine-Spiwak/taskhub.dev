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
    res.status(200).json(tasks)
  } else {
    res.status(404)
    throw new Error('Tasks Not Found')
  }
})

// @desc    Update a Task
// @route   PUT /api/tasks
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.body.taskId)

  if (task) {
    task.name = req.body.name || task.name
    task.desc = req.body.desc || task.desc

    await task.save()

    res.status(200).json(task)
  } else {
    res.status(404)
    throw new Error('Task Not Found')
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