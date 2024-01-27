import { useState } from "react"
import { useSelector } from "react-redux"
import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../../../slices/todosApiSlice"
import { AiOutlineDelete } from "react-icons/ai";
import '../TodoSection.css'
import { Draggable, Droppable } from "react-beautiful-dnd";




const TodoSection = ({task, taskId}) => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [editTodoId, setEditTodoId] = useState('')
  const [editTodoDesc, setEditTodoDesc] = useState('')
  const [hoveringId, setHoveringId] = useState('')

  // Query & Mutations
  const { data: todos, isLoading, error} = useGetTodosQuery({taskId})
  const [ updateTodo ] = useUpdateTodoMutation()
  const [ deleteTodo ] = useDeleteTodoMutation()

  // API Call Functions
  const handleEditTodo = async () => {
    const data = {
      projectId: activeProjectId,
      todoId: editTodoId,
      description: editTodoDesc,
      taskId: taskId
    }
    await updateTodo(data)
    setEditTodoId('')
    setEditTodoDesc('')
  }

  const handleDeleteTodo = async (todoId) => {
    const updatedTodos = [...todos]

    const filteredTodos = updatedTodos.filter(todo => todo._id !== todoId)    

    const data = {
      projectId: activeProjectId,
      taskId: taskId,
      todoId: todoId
    }
    await deleteTodo(data)

    // Update the order of the remaining todos
    const updatedOrderTodos = filteredTodos.map(async (todo, index) => {
      await updateTodo({
        projectId: activeProjectId,
        todoId: todo._id,
        taskId: taskId,
        order: index
      })
      return { ...todos, order: index}
    })

    await Promise.all(updatedOrderTodos)
  }

  if ( isLoading ) return <p>Loading</p>
  if ( error ) return <div>{ error?.data?.message || error.error }</div>

  return (
    <Droppable droppableId={task._id} type='todos'>
      {(provided) => (
        <ul 
          className='todo-list'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {todos.map((todo, index) => (
            <Draggable 
              key={todo._id}
              draggableId={todo._id}
              index={index}
            >
              {(provided) => (
                <li 
                  className='todo' 
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <div className="todo-order">{index + 1}</div>
                  <hr></hr>
                  {todo._id !== editTodoId ? (
                    <div 
                      className="todo-section"
                      onDoubleClick={() => setEditTodoId(todo._id)}
                      onMouseEnter={() => setHoveringId(todo._id)}
                      onMouseLeave={() => setHoveringId('')}
                    >
                      <div className='todo-description'>{todo.description}</div>
                      <AiOutlineDelete
                        className={`del-todo-btn ${todo._id === hoveringId ? '' : 'hidden'}`}
                        onClick={() => handleDeleteTodo(todo._id)}
                      >
                      </AiOutlineDelete>
                    </div>
                  ) : (
                    <input
                      className="edit-todo-input"
                      onKeyDown={(e) => {if (e.key === 'Enter') handleEditTodo()}}
                      defaultValue={todo.description}
                      onChange={(e) => setEditTodoDesc(e.target.value)}
                      onBlur={() => setEditTodoId('')}
                      autoFocus
                    >
                    </input>
                  )}
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

export default TodoSection