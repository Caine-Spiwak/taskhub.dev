import { useEffect, useState } from "react"
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
  // COMPONENT STATE
  const [todos, setTodos] = useState([])

  // QUERY & MUTATIONS
  const { data: todoData, isLoading, error} = useGetTodosQuery({taskId: props.taskId})
  const [updateTodo] = useUpdateTodoMutation()

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

  // USE-EFFECT
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
            {todos.map((todo, index) => <Todo key={todo._id} id={todo._id} todo={todo} todos={todos} index={index}/>)}
          </ul>
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default TodoSection