import './TaskSection.css'
import { IoIosAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux"
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "../../slices/tasksApiSlice"
import { useCreateTodoMutation, useUpdateTodoMutation } from '../../slices/todosApiSlice'
// import TodoSection from '../../todos/components/TodoSection';
import { useState, useEffect } from 'react';
// import TaskDescription from './TaskDescription';
// import TaskDescriptionEdit from './TaskDescriptionEdit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


const TaskSection = () => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [tasks, setTasks] = useState([])
  const [newTaskName, setNewTaskName] = useState('')
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskNameId, setEditTaskNameId] = useState('')
  // const [editDescId, setEditDescId] = useState('')

  // Query & Mutations 
  const { data: taskData, isLoading, error } = useGetTasksQuery(activeProjectId)
  const [ createTask ] = useCreateTaskMutation()
  const [ updateTask ] = useUpdateTaskMutation()
  const [ deleteTask ] = useDeleteTaskMutation()
  const [ createTodo ] = useCreateTodoMutation()
  const [ updateTodo ] = useUpdateTodoMutation()
	
  // API Call Functions
  const handleCreateTask = async () => {
    await createTask({ 
      projectId: activeProjectId, 
      name: newTaskName,
      order: tasks.length
    })
    setNewTaskName('')
  }

  const handleCreateTodo = async (taskId) => {
    const length = tasks.find(task => task._id === taskId).todos.length
    await createTodo({ 
      projectId: activeProjectId, 
      taskId: taskId,
      order: length,
    })
  }

  const handleEditTaskName = async () => {
    const data = {
      projectId: activeProjectId,
      taskId: editTaskNameId,
      name: editTaskName
    }
    await updateTask(data)
    setEditTaskNameId('')
    setEditTaskName('')
  }

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = [...tasks]

    const filteredTasks = updatedTasks.filter(task => task._id !== taskId)

    const data = {
      projectId: activeProjectId,
      taskId: taskId,
    }
    await deleteTask(data)

    // Update the order of the remaining tasks
    const updatedOrderTasks = filteredTasks.map(async (task, index) => {
      await updateTask({
        projectId: activeProjectId,
        taskId: task._id,
        order: index,
      });
      return { ...task, order: index }; // Return the updated task with correct order
    });

    // Wait for all updateTask promises to complete
    await Promise.all(updatedOrderTasks);
  }

  const handleDragEnd = async (result) => {
    const { source, destination, type } = result;
  
    if (result.source.droppableId !== result.destination.droppableId) return;
  
    // Update Task Order Locally 
    if (type === 'tasks') {
      const updatedTasks = [...tasks];
      const [draggedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, draggedTask);
  
      console.log('Updated Tasks Locally:', updatedTasks);
  
      setTasks(updatedTasks);
  
      // Update on Server
      const updateTasksOnServer = async () => {
        const updatedTasksOnServer = updatedTasks.map(async (task, index) => {
          console.log(`Updating task ${task._id} (order: ${index})`);
  
          try {
            const response = await updateTask({
              taskId: task._id,
              order: index,
            });
  
            console.log(`Task ${task._id} updated successfully. Response:`, response);
  
            return { ...task, order: index };
          } catch (error) {
            console.error(`Error updating task ${task._id}:`, error);
            throw error; // Re-throw the error to stop Promise.all if one request fails
          }
        });
  
        // Wait for all updateTask promises to complete
        await Promise.all(updatedTasksOnServer);
      };
  
      console.log('Updating tasks on the server...');
      await updateTasksOnServer();
      console.log('Tasks updated on the server.');
    }
  
    // ... (additional logic for handling todos)
    // if (type === 'todos') {
    //   const todos = tasks.find(task => task._id === result.source.droppableId).todos
    //   const updatedTodos = JSON.parse(JSON.stringify(todos.slice().sort((a, b) => a.order - b.order)))
    //   await updateTodo({
    //     projectId: activeProjectId,
    //     taskId: result.source.droppableId,
    //     todoId: updatedTodos[sourceIndex]._id,
    //     order: destinationIndex
    //   })
    //   await updateTodo({
    //     projectId: activeProjectId,
    //     taskId: result.source.droppableId,
    //     todoId: updatedTodos[destinationIndex]._id,
    //     order: sourceIndex
    //   })
    // }
  }


  // useEffect 
  useEffect(() => {
    if (taskData) {
      setTasks(taskData)
    }
  },[taskData])

  if ( isLoading ) return <p>Loading</p>
  if ( error ) return <div>{ error?.data?.message || error.error }</div>

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <div className="task-section">
      <div className="task-section-header">
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
      <Droppable droppableId="task-list" type='tasks'>
        {(provided) => (
          <ul 
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length < 1 && <p>No Tasks</p>}
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <li 
                    className='task'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className='order'>
                      <div className='order-number'>{index + 1}</div>
                    </div>
                    <div className='task-content'>
                      {task._id !== editTaskNameId ? (
                        <div 
                          className='task-header'
                        >
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
                            onBlur={() => setEditTaskNameId('')}
                            autoFocus
                          >
                          </input>
                        </div>
                      )}
                      {/* {task._id !== editDescId ? (
                        <TaskDescription 
                          task={task} 
                          setEditDescId={setEditDescId}
                        />
                      ) : (
                        <TaskDescriptionEdit 
                          task={task}
                          editDescId={editDescId}
                          setEditDescId={setEditDescId}
                        />
                      )} */}
                      {/* <TodoSection task={task} taskId={task._id}/> */}
                    </div>
                    <div className='task-control'>
                      <AiOutlineDelete
                        className='del-task-btn'
                        onClick={() => handleDeleteTask(task._id)}
                      >
                      </AiOutlineDelete>
                      <IoIosAdd
                        className='add-todo-btn'
                        onClick={() => handleCreateTodo(task._id)}
                      >
                      </IoIosAdd>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
    </DragDropContext>
  )
}

export default TaskSection;