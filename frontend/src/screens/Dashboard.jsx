import './Dashboard.css'
import ProjectSection from '../features/projects/ProjectSection'
// import TaskSection from '../features/tasks/TaskSection'
import NewTaskSection from '../features/new-task-section/NewTaskSection'
// import { Link } from 'react-router-dom';


const Dashboard = () => {

  return (
    <div className="window">
      <div className="sidebar">
        <ProjectSection />
        <div className='profile-section'>
          <hr />
          {/* <Link className='profile-link' to='/profile'>Profile</Link> */}
        </div>
      </div>  
      <div className="content">
        <NewTaskSection />
      </div>
    </div>
  )
}

export default Dashboard