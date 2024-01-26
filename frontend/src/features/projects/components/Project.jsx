import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { removeActiveProject, setActiveProject} from '../../../slices/activeProjectSlice.js'
import { useDeleteProjectMutation } from "../../../slices/projectsApiSlice.js";
import { useSelector, useDispatch } from 'react-redux';



const Project = ({project, setEditProjectId}) => {
	const dispatch = useDispatch()

	// State
	const { activeProjectId } = useSelector((state) => state.activeProject)
	const [isHovering, setIsHovering] = useState(null)

	// Query & Mutations
	const [ deleteProject ] = useDeleteProjectMutation()

	// API Call Functions
	const handleDeleteProject = async (projectId) => {
    await deleteProject({projectId})
    dispatch(removeActiveProject())
  }

  return (
		<div
			className={`project ${project._id === activeProjectId ? "active" : ""}`}
			onClick={() => dispatch(setActiveProject(project._id))}
			onDoubleClick={() => setEditProjectId(project._id)}
			onMouseEnter={() => setIsHovering(project._id)}
			onMouseLeave={() => setIsHovering(null)}
		>
			{project.name}
			<div className={`project-btns ${isHovering === project._id ? "" : "hidden"}`}>
				<AiOutlineDelete
					className='project-btn del-btn'
					onClick={() => handleDeleteProject(project._id) }
				>
				</AiOutlineDelete>
			</div>
		</div>
  )
}

export default Project