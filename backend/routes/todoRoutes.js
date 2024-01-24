import express from 'express';
const router = express.Router();
import {
  createTodo, deleteTodo, getTodos, updateTodo
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMIddleware.js'


// - /api/tasks

router.route('/:id').get(protect, getTodos)
router.route('/')
  .post(protect, createTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo)



export default router