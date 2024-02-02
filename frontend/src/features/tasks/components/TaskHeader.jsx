import { useState } from "react"
import { useUpdateTaskMutation } from "../../../slices/tasksApiSlice"

const TaskHeader = ({task}) => {
  // MUTATIONS
  const [ updateTask ] = useUpdateTaskMutation()
  // COMPONENT STATE
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskNameId, setEditTaskNameId] = useState('')

  // API CALL FUNCTIONS
  const handleEditTaskName = async () => {
    const data = {
      taskId: editTaskNameId,
      name: editTaskName
    }
    await updateTask(data)
    setEditTaskNameId('')
    setEditTaskName('')
  }

  return (
    <>
      {task._id !== editTaskNameId ? (
        <div className='task-header'>
          <div 
            className='task-name'
            onDoubleClick={() => setEditTaskNameId(task._id)}
          >
            {task.name}
          </div>
        </div>
      ) : (
        <div className="task-header">
          <input
            className='edit-task-name-input'
            defaultValue={task.name}
            onChange={(e) => setEditTaskName(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') handleEditTaskName()}}
            autoFocus
          >
          </input>
        </div>
      )}
    </>
  )
}

export default TaskHeader