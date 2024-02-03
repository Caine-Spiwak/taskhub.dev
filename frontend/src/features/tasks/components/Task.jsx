import { IoIosAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { useCreateTodoMutation } from "../../../slices/todosApiSlice";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../../slices/tasksApiSlice";
import TaskDescription from "./TaskDescription";
import TodoSection from '../../todos/TodoSection'
import TaskHeader from "./TaskHeader";
import { RiDraggable } from "react-icons/ri";


const NewTask = (props) => {
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

  // QUERY & MUTATIONS
  const [createTodo] = useCreateTodoMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  // API CALL FUNCTIONS
  const handleDeleteTask = async (taskId) => {
    const updatedTasks = [...props.tasks]
    const filteredTasks = updatedTasks.filter(task => task._id !== taskId)
    
    const data = {
      taskId: taskId,
    }
    await deleteTask(data)

    // Update the order of the remaining tasks
    const updatedOrderTasks = filteredTasks.map(async (task, index) => {
      await updateTask({
        taskId: task._id,
        order: index,
      });
      return { ...task, order: index }; // Return the updated task with correct order
    });

    // Wait for all updateTask promises to complete
    await Promise.all(updatedOrderTasks);
  }

  const handleCreateTodo = async (taskId) => {
    await createTodo({ 
      taskId: taskId,
    })
  }

  return (
    <>
      <li 
        className='task'
        ref={setNodeRef}
        {...attributes}
        style={style}
      >
        <div className='order'>
          {/* <div className='order-number'>{props.index + 1}</div> */}
          <div className="handle" {...listeners}><RiDraggable /></div>
        </div>
        <div className='task-content'>
          <TaskHeader task={props.task} />
          {/* <TaskDescription task={props.task}/> */}
          <TodoSection taskId={props.task._id}/>
        </div>
        <div className='task-control'>
          <IoIosAdd
            className='add-todo-btn'
            onClick={() => handleCreateTodo(props.task._id)}
          >
          </IoIosAdd>
          <hr></hr>
          <AiOutlineDelete
            className='del-task-btn'
            onClick={() => handleDeleteTask(props.task._id)}
          >
          </AiOutlineDelete>
        </div>
      </li>
    </>
  )
}

export default NewTask