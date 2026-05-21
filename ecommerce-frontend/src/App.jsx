import {BrowserRouter, Routes, Route} from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import ProductsPage from "./pages/ProductsPage"
import ProtectedRoute from "./components/ProtectedRoute"
import CartPage from "./pages/CartPage"

function App() {

	return (

		<BrowserRouter>

			<Routes>

				<Route path="/"
					element={<LoginPage/>}/>
				<Route path="/products"
					element={
						<ProtectedRoute><ProductsPage/></ProtectedRoute>
					}/>
				<Route path="/cart"
					element={
						<ProtectedRoute><CartPage/></ProtectedRoute>
					}/>

			</Routes>

		</BrowserRouter>
	)
}

export default App
