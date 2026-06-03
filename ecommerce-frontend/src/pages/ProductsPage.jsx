import {useEffect, useState} from "react"
import {toast} from "react-toastify"
import Navbar from "../components/Navbar"
import "../style/ProductsPage.css"
function ProductsPage() {

	const [loading, setLoading] = useState(true)
	const [products, setProducts] = useState([])
	const [searchTerm, setSearchTerm] = useState("")

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
			setLoading(false)

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

			if (! response.ok) {

				toast.error("Only users can add items to cart")

				return
			}

			const data = await response.text()

			toast.success(data)

		} catch (error) {

			toast.error("Something went wrong")
		}
	}
	const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

	if (loading) {

		return (

			<div>

				<Navbar/>

				<h2>
					Loading products...
				</h2>

			</div>
		)
	}

	return (

		<div>

			<Navbar/>

			<div className="products-container">

				<h2 className="products-title">
					Products
				</h2>

				<input type="text" placeholder="Search products..."
					value={searchTerm}
					onChange={
						(e) => setSearchTerm(e.target.value)
					}
					className="search-input"/> {
				filteredProducts.length === 0 && (
					<h3>
						No products found
					</h3>
				)
			}

				<div className="products-grid">

					{
					filteredProducts.map((product) => (

						<div key={
								product.id
							}

							className="product-card">

							<img src={
									product.imageUrl
								}

								alt={
									product.name
								}

								className="product-image"/>

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
