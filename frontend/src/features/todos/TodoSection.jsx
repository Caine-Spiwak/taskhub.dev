import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useGetTodosQuery, useUpdateTodoMutation } from '../../slices/todosApiSlice'
import './TodoSection.css'
import { DndContext, closestCenter } from "@dnd-kit/core";
import { 
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import Todo from "./components/Todo";




const TodoSection = (props) => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [todos, setTodos] = useState([])

  // Query & Mutations
  const { data: todoData, isLoading, error} = useGetTodosQuery({taskId: props.taskId})
  const [updateTodo] = useUpdateTodoMutation()



  useEffect(() => {
    if (todoData) {
      setTodos(todoData)
    }
  }, [todoData])

  if ( isLoading ) return <p>Loading</p>
  if ( error ) return <div>{ error?.data?.message || error.error }</div>


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div 
        className='todo-section'
      >
        <SortableContext
          items={todos.map(todo => todo._id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="todo-list">
            {todos.map((todo, index) => <Todo key={todo._id} id={todo._id} todo={todo} index={index}/>)}
          </ul>
        </SortableContext>
      </div>
    </DndContext>
  )

  // API Call Functions
  function handleDragEnd(event) {
    const { active, over } = event;
  
    if (active.id !== over.id) {
      setTodos((items) => {
        const activeIndex = items.findIndex((todo) => todo._id === active.id);
        const overIndex = items.findIndex((todo) => todo._id === over.id);
  
        const updatedItems = arrayMove(items, activeIndex, overIndex);

        updatedItems.map(async (todo, index) => {
          await updateTodo({
            todoId: todo._id,
            order: index
          })
        })
  
        return updatedItems;
      });
    }
  }
}

export default TodoSection