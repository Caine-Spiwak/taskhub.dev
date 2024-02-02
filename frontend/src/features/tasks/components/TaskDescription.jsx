import { BiEdit } from "react-icons/bi"
import { FaRegCheckCircle } from "react-icons/fa";
import { useState } from "react"
import { useEffect, useRef } from "react"
import { useUpdateTaskMutation } from "../../../slices/tasksApiSlice";

const TaskDescription = ({task}) => {
  // REFERENCE
  const textAreaRef = useRef(null)

  // MUTATIONS
  const [ updateTask ] = useUpdateTaskMutation()

  // COMPONENT STATE
  const [taskDesc, setTaskDesc] = useState('')
  const [editDescId, setEditDescId] = useState('')
  const [descHoveringId, setDescHoveringId] = useState('')

  // API CALL FUNCTIONS
  const handleEditTaskDesc = async () => {
    if (taskDesc.trim() !== task.desc) {
      const data = {
        taskId: editDescId,
        desc: taskDesc.trim()
      };
      await updateTask(data);
    }
    setEditDescId('');
    setTaskDesc('');
  };
  

  // USE-EFFECT
  useEffect(() => {
    if (textAreaRef.current && editDescId === task._id) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
      textAreaRef.current.offsetHeight; // Trigger reflow
    }
  }, [editDescId, task._id]);
  

  return (
    <>
      {task._id !== editDescId ? (
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
      ) : (
        <div className='task-description'>
          <textarea
            className='task-description-input'
            defaultValue={task.desc}
            onChange={(e) => setTaskDesc(e.target.value)}
            autoFocus
            ref={textAreaRef}
          >
          </textarea>
          <FaRegCheckCircle
            className='edit-task-description-btn task-icon'
            style={{'color': 'green'}}
            onClick={() => handleEditTaskDesc()}
          >
          </FaRegCheckCircle>
        </div>
      )}
    </>
  )
}

export default TaskDescription