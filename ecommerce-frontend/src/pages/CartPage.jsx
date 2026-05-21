import {useEffect, useState} from "react"

import Navbar from "../components/Navbar"

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

			<h2>Cart</h2>

			<button onClick={placeOrder}>
				Place Order
			</button>

			<hr/> {
			cartItems.map((item) => (

				<div key={
					item.id
				}>

					<h3> {
						item.product.name
					} </h3>

					<p>
						Quantity: {
						item.quantity
					} </p>

					<p>
						Price:
																														                            ₹ {
						item.product.price
					} </p>

					<button onClick={
						() => removeFromCart(item.id)
					}>
						Remove
					</button>
					<hr/>

				</div>
			))
		} </div>
	)
}

export default CartPage
