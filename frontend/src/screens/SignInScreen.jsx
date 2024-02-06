import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from 'react-toastify'
import Header from "../components/Header"
import Footer from "../components/Footer"


const SignInScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [login, { isLoading }] = useLoginMutation()

	const { userInfo } = useSelector((state) => state.auth)

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()
		try {
			const res = await login({ email, password}).unwrap()
			dispatch(setCredentials({...res}))
			navigate('/')
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}


  return (
	<>
		<Header />
		<div>
			<div className="lp-form-container">
				<h1 className="lp-form-title">Sign In</h1>
				<form className="lp-form" onSubmit={ submitHandler }>
			
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
					{ isLoading && <p>Loading...</p>}
					<button className="lp-form-btn" type="submit">Sign In</button>
					<div className="form-row">
						<p className="lp-form-bttm">New Customer? <Link className="link" to='/signup'>Sign Up</Link></p>
					</div>
				</form>
			</div>
		</div>
		<Footer />
	</>

  )
}

export default SignInScreen