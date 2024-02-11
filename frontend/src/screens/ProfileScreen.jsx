import './ProfileScreen.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from "../slices/authSlice"
import { useUpdateUserMutation, useLogoutMutation } from '../slices/usersApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { removeActiveProject } from '../slices/activeProjectSlice'



const ProfileScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// GLOBAL STATE
	const { userInfo } = useSelector((state) => state.auth)
	// const { activeProject } = useSelector((state) => state.activeProject)

	// State
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('') 
	const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


	// Query & Mutations
	const [updateProfile, { isLoading }] = useUpdateUserMutation()
	const [logoutApiCall] = useLogoutMutation()

	// API Call Functions
	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			dispatch(removeActiveProject())
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					fName: firstName,
					lName: lastName,
					email,
					password
				}).unwrap()
				dispatch(setCredentials({...res}))
				toast.success('Profile Updated')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	// Use Effect
	useEffect(() => {
		if (userInfo) {
			setFirstName(userInfo.fName)
			setLastName(userInfo.lName)
			setEmail(userInfo.email)
		}
	}, [userInfo])

  return (
    <div className="container">
			<div className="form-container">
				<h1 className='form-title'>Update Profile</h1>
				<form className='profile-form' onSubmit={ submitHandler }>
	
					<div className="form-row">
						<label>First Name</label>
						<input  
							type="text"
							className='form-input'  
							placeholder="Enter First Name..." 
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						>
						</input>
					</div>

					<div className="form-row">
						<label>Last Name</label>
						<input  
							type="text"
							className='form-input' 
							placeholder="Enter Last Name..." 
							value={lastName} 
							onChange={(e) => setLastName(e.target.value)}
						>
						</input>
					</div>
					
					<div className="form-row">
						<label>Email Address</label>
						<input 
							type="email"
							className='form-input'  
							placeholder="Enter Email..." 
							value={email} 
							onChange={(e) => setEmail(e.target.value)}
						>
						</input>
					</div>
	
					<div className="form-row">
						<label>Password</label>
						<input 
							type="password"
							className='form-input'  
							placeholder="Enter Password..." 
							value={password} 
							onChange={(e) => setPassword(e.target.value)}
						>
						</input>
					</div>
	
					<div className="form-row">
						<label>Confirm Password</label>
						<input 
							type="password"
							className='form-input'  
							placeholder="Confirm Password..." 
							value={confirmPassword} 
							onChange={(e) => setConfirmPassword(e.target.value)}
						>
						</input>
					</div>
	
					{ isLoading && <p>Loading...</p>}
	
					<button type="submit">Update</button>

					<button 
						type='button' 
						className='logout-btn'
						onClick={() => logoutHandler()}
						>
						Logout
					</button>

					<Link to='/'><button type='button' className='back-btn'>Back</button></Link>
	
				</form>
			</div>
		</div>
  )
}

export default ProfileScreen