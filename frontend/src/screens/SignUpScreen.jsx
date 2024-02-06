import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from "../slices/authSlice"
import { useRegisterMutation } from "../slices/usersApiSlice"
import Header from "../components/Header"
import Footer from "../components/Footer"

const SignUpScreen = () => {
  const [fName, setFirstName] = useState('')
  const [lName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

	const { userInfo } = useSelector((state) => state.auth)

	const [register, { isLoading }] = useRegisterMutation()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
		} else {
			try {
				const res = await register({ fName, lName, email, password}).unwrap()
				dispatch(setCredentials({...res}))
				navigate('/')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}


  return (
		<>
			<Header />
			<div>
				<div className="lp-form-container">
					<h1 className="lp-form-title">Sign Up</h1>
					<form className="lp-form" onSubmit={ submitHandler }>
												
						<div className="form-row">
							<label>First Name</label>
							<input
								className="lp-input"
								type="text"
								placeholder="Enter First Name..."
								value={fName}
								onChange={(e) => setFirstName(e.target.value)}
							>
							</input>
						</div>
				
									<div className="form-row">
							<label>Last Name</label>
							<input
								className="lp-input"
								type="text"
								placeholder="Enter Last Name..."
								value={lName}
								onChange={(e) => setLastName(e.target.value)}
							>
							</input>
						</div>
				
						<div className="form-row">
							<label>Email Address</label>
							<input
								className="lp-input"
								type="email"
								placeholder="Enter Email..."
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							>
							</input>
						</div>
						<div className="form-row">
							<label>Password</label>
							<input
								className="lp-input"
								type="password"
								placeholder="Enter Password..."
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							>
							</input>
						</div>
						<div className="form-row">
							<label>Confirm Password</label>
							<input
								className="lp-input"
								type="password"
								placeholder="Confirm Password..."
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							>
							</input>
						</div>
						{ isLoading && <p>Loading...</p>}
						<button className="lp-form-btn" type="submit">Sign Up</button>
						<div className="form-row">
							<p className="lp-form-bttm">Already have an account? <Link to='/signin' className="link">Sign In</Link></p>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
  )
}

export default SignUpScreen