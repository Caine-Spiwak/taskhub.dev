import './NewTaskSection.css'
import { useGetTasksQuery } from '../../slices/tasksApiSlice'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const NewTaskSection = () => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [tasks, setTasks] = useState([])
  // const [newTaskName, setNewTaskName] = useState('')
  // const [editTaskName, setEditTaskName] = useState('')
  // const [editTaskNameId, setEditTaskNameId] = useState('')
  // const [editDescId, setEditDescId] = useState('')

  // Query & Mutations 
  const { data: taskData, isLoading, error } = useGetTasksQuery(activeProjectId)
  // const [ createTask ] = useCreateTaskMutation()
  // const [ updateTask ] = useUpdateTaskMutation()
  // const [ deleteTask ] = useDeleteTaskMutation()
  // const [ createTodo ] = useCreateTodoMutation()
  // const [ updateTodo ] = useUpdateTodoMutation()

  // USE-EFFECT
  useEffect(() => {
    if (taskData) {
      setTasks(taskData)
    }
  }, [taskData])


  return (
    <div className='task-section'>
      <div className='task-section-header'></div>
      <ul className='task-list'>

      </ul>
    </div>
  )
}

export default NewTaskSection