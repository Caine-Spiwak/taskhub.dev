import express from 'express';
const router = express.Router();
import {
  createTask, deleteTask, getTasks, updateTask
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMIddleware.js'


// - /api/tasks

router.route('/:id').get(protect, getTasks)
router.route('/')
  .post(protect, createTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask)



export default router