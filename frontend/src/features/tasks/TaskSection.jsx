import './TaskSection.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useCreateTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from '../../slices/tasksApiSlice'
import NewTask from './components/Task';

const NewTaskSection = () => {
  // GLOBAL STATE
  const { activeProjectId } = useSelector((state) => state.activeProject)
  
  // QUERY & MUTATIONS
  const { data: taskData, isLoading, error } = useGetTasksQuery(activeProjectId)
  const [ createTask ] = useCreateTaskMutation()
  const [ updateTask ] = useUpdateTaskMutation()

  // COMPONENT STATE
  const [tasks, setTasks] = useState([])
  const [newTaskName, setNewTaskName] = useState('')

  // API CALL FUNCTIONS
  const handleCreateTask = async () => {
    await createTask({ 
      projectId: activeProjectId, 
      name: newTaskName,
      order: tasks.length
    })
    setNewTaskName('')
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
  
    if (active.id !== over.id) {
      setTasks((items) => {
        const activeIndex = items.findIndex((task) => task._id === active.id);
        const overIndex = items.findIndex((task) => task._id === over.id);
        const updatedItems = arrayMove(items, activeIndex, overIndex);
        
        // Update order property on server
        updatedItems.map(async (task, index) => {
          await updateTask({
            taskId: task._id,
            order: index
          })
        })
        return updatedItems;
      });
    }
  }

  // USE-EFFECT
  useEffect(() => {
    if (taskData) {
      setTasks(taskData)
    }
  }, [taskData])

  if ( isLoading ) return <p>Loading</p>
  if ( error ) return <div>{ error?.data?.message || error.error }</div>

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="task-section">
        <div className='task-section-header'>
          <input
            className='new-task-input'
            placeholder="New Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') handleCreateTask()}}
            onBlur={() => setNewTaskName('')}
          >
          </input>
        </div>
        <hr className='task-header-hr'></hr>
        {tasks.length < 1 && <p>No Tasks</p>}
        <SortableContext
          items={tasks.map(task => task._id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="task-list">
            {tasks.map((task, index) => <NewTask key={task._id} id={task._id} task={task} index={index} tasks={tasks}/>)}
          </ul>
        </SortableContext>
      </div>
    </DndContext>
  );
}

export default NewTaskSection