import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../style/AdminPage.css";

function AdminPage() {
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const categories = [
        ...new Set(
            products
                .map((product) => product.category)
                .filter(Boolean)
        ),
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const clearForm = () => {
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImageUrl("");
        setNewCategory("");
        setShowNewCategoryInput(false);
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            setProducts(data);
        } catch {
            toast.error("Failed to load products");
        }
    };

    const createProduct = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        price: Number(price),
                        description,
                        category,
                        imageUrl,
                    }),
                }
            );

            if (!response.ok) {
                toast.error("Failed to create product");
                return;
            }

            toast.success("Product created");

            clearForm();
            setShowAddModal(false);

            fetchProducts();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                toast.error("Failed to delete product");
                return;
            }

            toast.success("Product deleted");

            fetchProducts();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <Navbar />

            <div className="products-container">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h2>Admin Dashboard</h2>

                    <button
                        className="add-product-button"
                        onClick={() => setShowAddModal(true)}
                    >
                        + Add Product
                    </button>
                </div>

                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                        >
                            <h3>{product.name}</h3>

                            <p>{product.category}</p>

                            <p>₹ {product.price}</p>

                            {product.imageUrl && (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        objectFit: "cover",
                                    }}
                                />
                            )}

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                <button>Edit</button>

                                <button
                                    onClick={() =>
                                        deleteProduct(product.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add Product</h2>

                        <input
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                        />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                >
                                    {cat}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={() =>
                                setShowNewCategoryInput(
                                    !showNewCategoryInput
                                )
                            }
                        >
                            + New Category
                        </button>

                        {showNewCategoryInput && (
                            <div
                                style={{
                                    marginTop: "10px",
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="New Category"
                                    value={newCategory}
                                    onChange={(e) =>
                                        setNewCategory(
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (
                                            !newCategory.trim()
                                        ) {
                                            toast.error(
                                                "Enter category name"
                                            );
                                            return;
                                        }

                                        setCategory(
                                            newCategory.trim()
                                        );

                                        setShowNewCategoryInput(
                                            false
                                        );

                                        setNewCategory("");
                                    }}
                                >
                                    Save Category
                                </button>
                            </div>
                        )}

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) =>
                                setImageUrl(
                                    e.target.value
                                )
                            }
                        />

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                onClick={createProduct}
                            >
                                Create Product
                            </button>

                            <button
                                onClick={() => {
                                    clearForm();
                                    setShowAddModal(
                                        false
                                    );
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;