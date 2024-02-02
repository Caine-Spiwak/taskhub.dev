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

  const order = (await Todo.find({taskId: taskId})).length

  const todo = await Todo.create({
    taskId,
    desc: 'new todo',
    order,
  })

	res.status(200).json(todo)
})

// @desc    Get a Task's Todos
// @route   GET /api/todos/:id
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({taskId: req.params.id})

  if (todos) {
    const sortedTodos = todos.sort((a, b) => a.order - b.order) 
    res.status(200).json(sortedTodos)
  } else {
    res.status(404)
    throw new Error('Todos Not Found')
  }
})

// @desc    Update a Todo
// @route   PUT /api/todos
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todoId = req.body.todoId;
  const desc = req.body.desc;
  const order = Number(req.body.order);

  // Build an update object with only the provided fields
  const updateObject = {};
  if (typeof desc !== 'undefined') {
    updateObject.desc = desc;
  }
  if (!isNaN(order)) {
    updateObject.order = order;
  }

  // Perform the update only if there are fields to update
  if (Object.keys(updateObject).length > 0) {
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: updateObject },
      { new: true }
    );

    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404);
      throw new Error('Todo not found or not updated properly');
    }
  } else {
    // No fields to update, respond with the current todo
    const currentTodo = await Todo.findById(todoId);
    if (currentTodo) {
      res.status(200).json(currentTodo);
    } else {
      res.status(404);
      throw new Error('Todo not found');
    }
  }
});


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