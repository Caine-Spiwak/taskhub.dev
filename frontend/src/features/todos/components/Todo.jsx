import { AiOutlineDelete } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const Todo = (props) => {

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

  return (
    <li 
    className='todo' 
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={style}
  >
    <div className="todo-order">{props.index + 1}</div>
    <hr></hr>
      <div 
        className="todo-section"
      >
        <div className='todo-description'>{props.todo.desc}</div>
        <AiOutlineDelete
          className={`del-todo-btn `}
        >
        </AiOutlineDelete>
      </div>
  </li>
  )
}

export default Todo