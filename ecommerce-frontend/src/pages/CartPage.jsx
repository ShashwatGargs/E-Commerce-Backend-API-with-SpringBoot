import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import Navbar from "../components/Navbar"
import "../style/CartPage.css"

function CartPage() {

    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

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

            if (!response.ok) {
                toast.error("Only users can access cart")
                return
            }

            const data = await response.json()
            setCartItems(data)

        } catch (error) {

            toast.error("Failed to load cart")

        } finally {

            setLoading(false)
        }
    }

    const removeFromCart = async (id) => {

        try {

            const token = localStorage.getItem("token")

            const response = await fetch(`http://localhost:8080/cart/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                toast.error("Failed to remove item")
                return
            }

            toast.success("Item removed")
            fetchCart()

        } catch (error) {

            toast.error("Something went wrong")
        }
    }

    const placeOrder = async () => {

        if (cartItems.length === 0) {
            toast.warning("Cart is empty")
            return
        }

        try {

            const token = localStorage.getItem("token")

            const response = await fetch("http://localhost:8080/orders", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                toast.error("Only users can place orders")
                return
            }

            const data = await response.text()

            toast.success(data)

            fetchCart()

        } catch (error) {

            toast.error("Something went wrong")
        }
    }

    if (loading) {

        return (
            <div>
                <Navbar />
                <h2>Loading cart...</h2>
            </div>
        )
    }

    return (

        <div>

            <Navbar />

            <div className="cart-container">

                <h2 className="cart-title">
                    Cart
                </h2>

                <button
                    onClick={placeOrder}
                    className="place-order-button"
                    disabled={cartItems.length === 0}
                >
                    Place Order
                </button>

                {
                    cartItems.length === 0 ? (

                        <div className="empty-cart">

                            <h3>Your cart is empty</h3>

                            <p>Add products to place orders</p>

                        </div>

                    ) : (

                        <div className="cart-grid">

                            {
                                cartItems.map((item) => (

                                    <div
                                        key={item.id}
                                        className="cart-card"
                                    >

                                        <h3 className="cart-product-name">
                                            {item.product.name}
                                        </h3>

                                        <p>
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="cart-product-price">
                                            ₹ {item.product.price}
                                        </p>

                                        <button
                                            className="remove-button"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default CartPage