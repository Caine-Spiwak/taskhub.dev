import express from 'express';
const router = express.Router();
import {
  createProject, deleteProject, getProjects, updateProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMIddleware.js'


// - /api/projects

router.route('/').post(protect, createProject).put(protect, updateProject).delete(protect, deleteProject)
router.route('/:id').get(protect, getProjects)


export default router