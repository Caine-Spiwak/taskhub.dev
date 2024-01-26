import './Dashboard.css'
import ProjectSection from '../features/projects/ProjectSection'
// import { Link } from 'react-router-dom';
// import TaskSection from '../features/tasks/components/TaskSection.jsx';

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
        {/* <TaskSection /> */}
      </div>
    </div>
  )
}

export default Dashboard