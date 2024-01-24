import asyncHandler from "../middleware/asyncHandler.js"
import Project from '../models/projectModel.js'


// @desc    Create a Project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  if(!req.body.name) {
		res.status(400)
		throw new Error('Please add a Name field')
	}

	const project = await Project.create({
		userId: req.body.userId,
		name: req.body.name
	})

	res.status(200).json(project)
})

// @desc    Get User's Projects
// @route   GET /api/projects/:id
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({userId: req.params.id})

  if (projects) {
    res.status(200).json(projects)
  } else {
    res.status(404)
    throw new Error('Projects Not Found')
  }
})

// @desc    Update User's Project
// @route   PUT /api/projects
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.body.projectId)

  if (project) {
    project.name = req.body.name

    await project.save()

    res.status(200).json(project)
  } else {
    res.status(404)
    throw new Error('Project Not Found')
  }
})

// @desc    Delete User's Project
// @route   DELETE /api/projects
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.body.projectId)

  if (project) {
    res.status(200).json({message: 'Project Deleted'})
  } else {
    res.status(404)
    throw new Error('Project Not Found')
  }
})

export {
  createProject,
  getProjects, 
  updateProject,
  deleteProject
}