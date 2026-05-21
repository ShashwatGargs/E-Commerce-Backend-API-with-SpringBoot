import {useNavigate} from "react-router-dom"

function Navbar() {

	const navigate = useNavigate()

	const handleLogout = () => {

		localStorage.removeItem("token")

		navigate("/")
	}

	return (

		<div>

			<button onClick={
				() => navigate("/products")
			}>
				Products
			</button>
			<button onClick={
				() => navigate("/cart")
			}>
				Cart
			</button>

			<button onClick={handleLogout}>
				Logout
			</button>


			<hr/>

		</div>
	)
}

export default Navbar
