import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDragHandle } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { useState } from "react";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../../../slices/todosApiSlice";

const Todo = (props) => {
  // DND-KIT
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: props.id});

  const style = {
      transform: CSS.Transform.toString(transform),
      transition
  }

  // MUTATIONS
  const [ updateTodo ] = useUpdateTodoMutation()
  const [ deleteTodo ] = useDeleteTodoMutation()

  // COMPONENT STATE
  const [editTodoId, setEditTodoId] = useState('')
  const [editTodoDesc, setEditTodoDesc] = useState('')
  const [hoveringId, setHoveringId] = useState('')

  // API Call Functions
  const handleEditTodo = async () => {
    const data = {
      todoId: editTodoId,
      desc: editTodoDesc,
    }
    await updateTodo(data)
    setEditTodoId('')
    setEditTodoDesc('')
  }

  const handleDeleteTodo = async (todoId) => {
    const updatedTodos = [...props.todos]
    const filteredTodos = updatedTodos.filter(todo => todo._id !== todoId)    

    const data = {
      todoId: todoId
    }
    await deleteTodo(data)

    // Update the order of the remaining todos
    const updatedOrderTodos = filteredTodos.map(async (todo, index) => {
      await updateTodo({
        todoId: todo._id,
        order: index
      })
      return { ...todo, order: index}
    })

    await Promise.all(updatedOrderTodos)
  }

  return (
    <li 
      className='todo' 
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <div className="todo-order" >{props.index + 1}</div>
      <MdOutlineDragHandle className="handle" {...listeners}/>
      {props.todo._id !== editTodoId ? (
        <div 
          className="todo-section"
          onDoubleClick={() => setEditTodoId(props.todo._id)}
          onMouseEnter={() => setHoveringId(props.todo._id)}
          onMouseLeave={() => setHoveringId('')}
        >
          <div className='todo-description'>{props.todo.desc}</div>
          <AiOutlineDelete
            className={`del-todo-btn ${props.todo._id === hoveringId ? '' : 'hidden'}`}
            onClick={() => handleDeleteTodo(props.todo._id)}
          >
          </AiOutlineDelete>
          </div>
      ) : (
        <input
          className="edit-todo-input"
          onKeyDown={(e) => {if (e.key === 'Enter') handleEditTodo()}}
          defaultValue={props.todo.desc}
          onChange={(e) => setEditTodoDesc(e.target.value)}
          onBlur={() => setEditTodoId('')}
          autoFocus
        >
        </input>
      )}
    </li>
  )
}

export default Todo