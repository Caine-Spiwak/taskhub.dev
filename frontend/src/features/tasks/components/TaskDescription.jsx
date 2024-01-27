import { BiEdit } from "react-icons/bi"
import { useState } from "react"



const TaskDescription = ({ task, setEditDescId }) => {

  const [descHoveringId, setDescHoveringId] = useState('')


  return (
    <div 
      className='task-description'
      onMouseEnter={() => setDescHoveringId(task._id)}
      onMouseLeave={() => setDescHoveringId('')}
    >
      <div className="task-description-text">{task.desc}</div>
      <BiEdit
        className={`edit-task-description-btn task-icon ${task._id === descHoveringId ? '' : 'hidden' }`}
        onClick={() => setEditDescId(task._id)}
      >
      </BiEdit>
    </div>
  )
}

export default TaskDescription