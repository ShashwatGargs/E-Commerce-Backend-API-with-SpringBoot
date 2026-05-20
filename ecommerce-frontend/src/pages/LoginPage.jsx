import {useState} from "react"

function LoginPage() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async (e) => {

		e.preventDefault()

		try {

			const response = await fetch("http://localhost:8080/auth/login", {
				method: "POST",

				headers: {
					"Content-Type": "application/json"
				},

				body: JSON.stringify(
					{email, password}
				)
			})

			const data = await response.text()

			console.log(data)

		} catch (error) {

			console.error(error)
		}
	}

	return (

		<div>

			<h2>Login</h2>

			<form onSubmit={handleLogin}>

				<div>
					<input type="email" placeholder="Enter email"
						value={email}
						onChange={
							(e) => setEmail(e.target.value)
						}/>
				</div>

				<br/>

				<div>
					<input type="password" placeholder="Enter password"
						value={password}
						onChange={
							(e) => setPassword(e.target.value)
						}/>
				</div>

				<br/>

				<button type="submit">
					Login
				</button>

			</form>

		</div>
	)
}

export default LoginPage
