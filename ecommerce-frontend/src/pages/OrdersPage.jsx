import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                toast.error("Failed to load orders");
                return;
            }

            const data = await response.json();

            console.log("ORDERS:", data);

            setOrders(data);

        } catch (error) {

            console.error(error);
            toast.error("Something went wrong");

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (
            <div>
                <Navbar />
                <h2>Loading orders...</h2>
            </div>
        );
    }

    return (

        <div>

            <Navbar />

            <div className="products-container">

                <h2>My Orders</h2>

                {orders.length === 0 ? (

                    <h3>No orders found</h3>

                ) : (

                    orders.map(order => (

                        <div
                            key={order.id}
                            className="product-card"
                            style={{ marginBottom: "20px" }}
                        >

                            <h3>
                                Order #{order.id}
                            </h3>

                            <p>
                                Date:
                                {" "}
                                {new Date(
                                    order.orderDate
                                ).toLocaleString()}
                            </p>

                            <p>
                                Total:
                                {" "}
                                ₹{order.totalAmount}
                            </p>

                            <hr />

                            {order.items?.map((item, index) => (

                                <div
                                    key={`${order.id}-${index}`}
                                >

                                    <p>
                                        <strong>
                                            {item.productName}
                                        </strong>
                                    </p>

                                    <p>
                                        Quantity:
                                        {" "}
                                        {item.quantity}
                                    </p>

                                    <p>
                                        Price:
                                        {" "}
                                        ₹{item.price}
                                    </p>

                                </div>

                            ))}

                        </div>

                    ))
                )}

            </div>

        </div>
    );
}

export default OrdersPage;