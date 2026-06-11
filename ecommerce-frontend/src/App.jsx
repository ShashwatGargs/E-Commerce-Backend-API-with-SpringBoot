import {BrowserRouter, Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"

import LoginPage from "./pages/LoginPage"
import ProductsPage from "./pages/ProductsPage"
import ProtectedRoute from "./components/ProtectedRoute"
import CartPage from "./pages/CartPage"
import 'react-toastify/dist/ReactToastify.css'
import AdminPage from "./pages/AdminPage";
import OrdersPage from "./pages/OrdersPage";
import {useState, useEffect} from "react";
import RegisterPage from "./pages/RegisterPage";

function App() {
	const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.body.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [darkMode]);
	return (

		<BrowserRouter>
			<ToastContainer/>
			<Routes>

				<Route path="/"
					element={<LoginPage/>}/>
				<Route path="/products"
					element={
						<ProtectedRoute><ProductsPage
  							darkMode={darkMode}
  								setDarkMode={setDarkMode}
						/></ProtectedRoute>
					}/>


					<Route
    path="/register"
    element={<RegisterPage />}
/>
				<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <CartPage
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminPage
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  }
/>

<Route
  path="/orders"
  element={
    <OrdersPage
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  }
/>

			</Routes>

		</BrowserRouter>
	)
}

export default App
