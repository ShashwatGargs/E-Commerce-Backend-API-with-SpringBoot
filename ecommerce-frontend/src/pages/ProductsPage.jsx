import {useEffect, useState} from "react"
import Navbar from "../components/Navbar"
import "../style/ProductsPage.css"
function ProductsPage() {

	const [products, setProducts] = useState([])

	useEffect(() => {

		fetchProducts()

	}, [])

	const fetchProducts = async () => {

		try {

			const token = localStorage.getItem("token")

			const response = await fetch("http://localhost:8080/products", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			const data = await response.json()

			setProducts(data)

		} catch (error) {

			console.error(error)
		}
	}
	const addToCart = async (productId) => {

		try {

			const token = localStorage.getItem("token")

			const response = await fetch("http://localhost:8080/cart", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`
				},

				body: JSON.stringify(
					{productId: productId, quantity: 1}
				)
			})

			const data = await response.text()

			alert(data)

		} catch (error) {

			console.error(error)
		}
	}

	return (

		<div>

			<Navbar/>

			<div className="products-container">

				<h2 className="products-title">
					Products
				</h2>

				<div className="products-grid">

					{
					products.map((product) => (

						<div key={
								product.id
							}

							className="product-card">

							<h3 className="product-name">
								{
								product.name
							} </h3>

							<p className="product-description">
								{
								product.description
							} </p>

							<p className="product-price">
								₹ {
								product.price
							} </p>

							<button className="product-button"

								onClick={
									() => addToCart(product.id)
							}>
								Add To Cart
							</button>

						</div>
					))
				} </div>

			</div>

		</div>
	)
}

export default ProductsPage
