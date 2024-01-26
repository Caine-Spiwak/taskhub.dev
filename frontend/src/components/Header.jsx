import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from "../slices/usersApiSlice"
import { logout } from '../slices/authSlice'



const Header = () => {
	const { userInfo } = useSelector((state) => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate() 

	const [logoutApiCall] = useLogoutMutation()



	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

  return (
    <header>
			<nav>
				<div className="nav-sections">
					<div className="logo-section">
						<Link to='/'>
							<div>BULLSEYE</div>
						</Link>
					</div>
					{ userInfo ? (
						<div className="ctas">
							<div>{userInfo.name}</div>
							<Link to='/profile'>Profile</Link>
							<button
								onClick={ logoutHandler }
							>Logout
							</button>
						</div>
					) : (
								
							<div className="ctas">
								<Link to="/signin">Sign In</Link>
								<Link to="/signup">Sign Up</Link>
							</div>
					)}
				</div>
			</nav>
		</header>
  )
}

export default Header