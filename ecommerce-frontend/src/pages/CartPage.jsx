import {useEffect, useState} from "react"

import Navbar from "../components/Navbar"
import "../style/CartPage.css"

function CartPage() {

	const [cartItems, setCartItems] = useState([])

	useEffect(() => {

		fetchCart()

	}, [])

	const fetchCart = async () => {

		try {

			const token = localStorage.getItem("token")

			const response = await fetch("http://localhost:8080/cart", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			const data = await response.json()

			setCartItems(data)

		} catch (error) {

			console.error(error)
		}
	}
	const removeFromCart = async (id) => {

		try {

			const token = localStorage.getItem("token")

			await fetch(`http://localhost:8080/cart/${id}`, {
				method: "DELETE",

				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			fetchCart()

		} catch (error) {

			console.error(error)
		}
	}
	const placeOrder = async () => {

		try {

			const token = localStorage.getItem("token")

			const response = await fetch("http://localhost:8080/orders", {
				method: "POST",

				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			const data = await response.text()

			alert(data)

			fetchCart()

		} catch (error) {

			console.error(error)
		}
	}

	return (

		<div>

			<Navbar/>

			<div className="cart-container">

				<h2 className="cart-title">
					Cart
				</h2>

				<button onClick={placeOrder}

					className="place-order-button">
					Place Order
				</button>

				<div className="cart-grid">

					{
					cartItems.map((item) => (

						<div key={
								item.id
							}

							className="cart-card">

							<h3 className="cart-product-name">
								{
								item.product.name
							} </h3>

							<p>
								Quantity: {
								item.quantity
							} </p>

							<p className="
									                                    cart-product-price
									                                ">
								₹ {
								item.product.price
							} </p>

							<button className="remove-button"

								onClick={
									() => removeFromCart(item.id)
							}>
								Remove
							</button>

						</div>
					))
				} </div>

			</div>

		</div>
	)
}

export default CartPage
