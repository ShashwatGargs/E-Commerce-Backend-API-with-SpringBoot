import {useNavigate} from "react-router-dom";
import "../style/Navbar.css";

function Navbar({darkMode, setDarkMode}) {
	const navigate = useNavigate();
	const role = localStorage.getItem("role");

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

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

				<button className="theme-toggle"
					onClick={
						() => setDarkMode(!darkMode)
				}>
					{
					darkMode ? "☀️" : "🌙"
				} </button>

				{
				role === "ADMIN" && (
					<button className="navbar-button"
						onClick={
							() => navigate("/admin")
					}>
						Admin
					</button>
				)
			}
				{
				role === "USER" && (

					<button className="navbar-button"
						onClick={
							() => navigate("/orders")
					}>
						My Orders
					</button>

				)
			}
				<button className="navbar-button"
					onClick={handleLogout}>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Navbar;
