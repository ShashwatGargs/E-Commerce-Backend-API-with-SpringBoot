import {BrowserRouter, Routes, Route} from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import ProductsPage from "./pages/ProductsPage"

function App() {

	return (

		<BrowserRouter>

			<Routes>

				<Route path="/"
					element={<LoginPage/>}/>
				<Route path="/products"
					element={<ProductsPage/>}/>

			</Routes>

		</BrowserRouter>
	)
}

export default App
