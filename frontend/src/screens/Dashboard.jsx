import './Dashboard.css'
import ProjectSection from '../features/projects/ProjectSection'
import TaskSection from '../features/tasks/TaskSection'
import { Link } from 'react-router-dom'
import { IoIosSettings } from "react-icons/io";

const currentYear = new Date().getFullYear()


const Dashboard = () => {
  return (
    <div className="window">
      <div className="sidebar">
        <ProjectSection />
        <div className='profile-section'>
          <hr />
          <Link className='profile-link' to='/profile'>
            <IoIosSettings />
            Profile
          </Link>
          <div className='copyright'>
            <p>Task Hub &copy;{currentYear}	</p>
          </div>
        </div>
      </div>  
      <div className="content">
        <TaskSection />
      </div>
    </div>
  )
}

export default Dashboard