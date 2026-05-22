import {useNavigate} from "react-router-dom"
import "../style/Navbar.css";

function Navbar() {

	const navigate = useNavigate()

	const handleLogout = () => {

		localStorage.removeItem("token")

		navigate("/")
	}

	return (

		<div className="navbar">

			<div className="navbar-title">
				E-Commerce
			</div>

			<div className="navbar-buttons">

				<button className="navbar-button"

					onClick={
						() => navigate("/products")
				}>
					Products
				</button>

				<button className="navbar-button"

					onClick={
						() => navigate("/cart")
				}>
					Cart
				</button>

				<button className="navbar-button"

					onClick={handleLogout}>
					Logout
				</button>

			</div>

		</div>
	)
}

export default Navbar
