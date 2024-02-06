import { Link } from "react-router-dom"


const Hero = () => {
  return (
    <div className="section">
      <div className="hero">
        <div className="hero-left">
          <h1 className="hero-title">LIFE MANAGEMENT</h1>
          <div className="hero-sub">If simplicity <br />and effeciency <br /> had a baby</div>
          <div className="hero-sub2">
            Inspired by Tony Robbins RPM framework. Organize your goals by project,
            each project having organizable tasks, and each task having organizable todos.
          </div>
          <Link to='/signup'><button className="cta-btn">Get Started</button></Link>
        </div>
        <div className="hero-right">
          <img src="./taskhub-screenshot-1.png" className="hero-img"></img>
        </div>
      </div>
    </div>
  )
}

export default Hero