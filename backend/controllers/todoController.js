import asyncHandler from "../middleware/asyncHandler.js"
import Todo from '../models/todoModel.js'


// @desc    Create a Todo
// @route   POST /api/todo
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  const { taskId } = req.body

  if(!req.body.taskId) {
		res.status(400)
		throw new Error('Please Provide taskId field')
	}

  const todo = await Todo.create({
    taskId,
    desc: 'new todo'
  })

	res.status(200).json(todo)
})

// @desc    Get a Task's Todos
// @route   GET /api/todos/:id
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({taskId: req.params.id})

  if (todos) {
    res.status(200).json(todos)
  } else {
    res.status(404)
    throw new Error('Todos Not Found')
  }
})

// @desc    Update a Todo
// @route   PUT /api/todos
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.body.todoId)

  if (todo) {
    todo.desc = req.body.desc || todo.desc

    await todo.save()

    res.status(200).json(todo)
  } else {
    res.status(404)
    throw new Error('Todo Not Found')
  }
})

// @desc    Delete a Todo
// @route   DELETE /api/todos
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.body.todoId)

  if (todo) {
    res.status(200).json({message: 'Todo Deleted'})
  } else {
    res.status(404)
    throw new Error('Todo Not Found')
  }
})

export {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}