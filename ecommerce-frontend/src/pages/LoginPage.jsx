import {useState} from "react"


import {useNavigate} from "react-router-dom"
import "../style/LoginPage.css"

function LoginPage() {

	const navigate = useNavigate()

	const [email, setEmail] = useState("")

	const [password, setPassword] = useState("")

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const handleLogin = async (e) => {

		e.preventDefault()

		try {

			if (!email || !password) {

				setError("All fields are required")

				return

			}
			setError("")
			setLoading(true)

			const response = await fetch("http://localhost:8080/auth/login", {
				method: "POST",

				headers: {
					"Content-Type": "application/json"
				},

				body: JSON.stringify(
					{email, password}
				)
			})

			const data = await response.json()

			if (data.message) {
				setError(data.message);
				setLoading(false);
				return;
			}

			localStorage.setItem("token", data.token);
			localStorage.setItem("role", data.role);

			navigate("/products");
		} catch (error) {
			setLoading(false)
			console.error(error)
		}

	}

	return (

		<div className="login-container">

			<form onSubmit={handleLogin}
				className="login-form">

				<h2 className="login-title">
					Login
				</h2>

				<input type="email" placeholder="Enter email"

					value={email}

					onChange={
						(e) => setEmail(e.target.value)
					}

					className="login-input"/>

				<input type="password" placeholder="Enter password"

					value={password}

					onChange={
						(e) => setPassword(e.target.value)
					}

					className="login-input"/> {
				error && <p className="login-error">
					{error} </p>
			}

				<button type="submit" className="login-button">
					{
					loading ? "Logging in..." : "Login"
				} </button>
				<p>
    				Don't have an account?
				</p>

				<button
    				onClick={() => navigate("/register")}
				>
    			Register
				</button>
			</form>

		</div>
	)
}

export default LoginPage
