import { MdOutlineCancel } from "react-icons/md"
import { useUpdateProjectMutation } from "../../../slices/projectsApiSlice"
import { useState } from "react"


const ProjectEdit = ({project, setEditProjectId}) => {

	// State
	const [editProjectName, setEditProjectName] = useState('')

	// Query & Mutations
	const [ updateProject ] = useUpdateProjectMutation()

	// API Call Functions
	const handleUpdateProject = async (id) => {
    await updateProject({ projectId: id, name: editProjectName})
    setEditProjectName('')
    setEditProjectId('')
  }


  return (
		<div className="edit-project-li">
			<input
				className="edit-project-input"
				defaultValue={project.name}
				onChange={(e) => setEditProjectName(e.target.value)}
				onKeyDown={(e) => {if (e.key === 'Enter') handleUpdateProject(project._id)}}
				onBlur={() => setEditProjectId('') && setEditProjectName('')}
				autoFocus
			>
			</input>
			<div className="project-btns">
				<MdOutlineCancel 
					className='cancel-edit-btn'
					onClick={() => setEditProjectId('') && setEditProjectName('')}
				/>
			</div>
		</div>
  )
}

export default ProjectEdit