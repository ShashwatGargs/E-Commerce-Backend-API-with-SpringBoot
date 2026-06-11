import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "../style/RegisterPage.css";
function RegisterPage() {

	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = async () => {

		try {

			const response = await fetch("http://localhost:8080/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(
					{name, email, password}
				)
			});

			if (! response.ok) {
				toast.error("Registration failed");
				return;
			}

			toast.success("Account created");

			navigate("/");

		} catch {

			toast.error("Something went wrong");
		}};

	return (

		<div className="register-container">

			<h2>Create Account</h2>

			<input type="text" placeholder="Full Name"
				value={name}
				onChange={
					(e) => setName(e.target.value)
				}/>

			<input type="email" placeholder="Email"
				value={email}
				onChange={
					(e) => setEmail(e.target.value)
				}/>

			<input type="password" placeholder="Password"
				value={password}
				onChange={
					(e) => setPassword(e.target.value)
				}/>

			<button onClick={register}>
				Register
			</button>

			<p className="register-link">
				Already have an account?{" "}
				<span onClick={
					() => navigate("/")
				}>
					Login
				</span>
			</p>

		</div>
	);
}

export default RegisterPage;
