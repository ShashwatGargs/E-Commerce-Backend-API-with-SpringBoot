import {useEffect, useState} from "react"
import Navbar from "../components/Navbar"
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

			<h2>Products</h2>

			{
			products.map((product) => (

				<div key={
					product.id
				}>

					<h3>{
						product.name
					}</h3>

					<p> {
						product.description
					} </p>

					<p>
						₹ {
						product.price
					} </p>

					<button onClick={
						() => addToCart(product.id)
					}>
						Add To Cart
					</button>

					<hr/>

				</div>
			))
		} </div>
	)
}

export default ProductsPage
