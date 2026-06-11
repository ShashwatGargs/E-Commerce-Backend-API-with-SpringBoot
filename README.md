# 🛒 E-Commerce Backend API with Spring Boot & React

A full-stack e-commerce application built using **Spring Boot**, **Spring Security**, **JWT Authentication**, **React**, and **MySQL**. The project demonstrates real-world backend architecture, secure authentication, role-based authorization, RESTful API design, file uploads, and modern frontend development practices.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Password Encryption using BCrypt
* Role-Based Access Control (RBAC)
* Protected Routes
* Stateless Security Architecture

### 👤 User Features

* Browse Products
* Search Products
* Filter Products by Category
* Add Products to Cart
* Update Cart Quantity
* Remove Items from Cart
* Place Orders
* View Order History
* Dark / Light Theme Toggle

### 🛠️ Admin Features

* Create Products
* Edit Products
* Archive Products (Soft Delete)
* Restore Archived Products
* Manage Product Catalog
* Upload Product Images
* View All Active Products

### 🖼️ Image Management

* Image Upload Support
* Local File Storage
* Dynamic Product Image Rendering
* Custom Resource Mapping for Static Content

### 📦 Product Management

* Product Categories
* Product Descriptions
* Product Pricing
* Product Images
* Active / Archived Product States

---

# 🏗️ Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* Maven
* MySQL

## Frontend

* React
* React Router
* React Toastify
* JavaScript (ES6+)
* CSS3

## Database

* MySQL

---

# 📁 Project Structure

## Backend

```text
src/main/java/com/dark/ecommerce

├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
├── service
└── util
```

## Frontend

```text
src

├── components
├── pages
├── style
└── assets
```

---

# 🔒 Security Architecture

The application uses JWT tokens for secure communication between frontend and backend.

### Authentication Flow

1. User logs in.
2. Server validates credentials.
3. JWT token is generated.
4. Token is stored in Local Storage.
5. Frontend sends token in Authorization header.
6. Spring Security validates token on every request.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🗂️ Database Design

### User

| Field    | Type   |
| -------- | ------ |
| id       | Long   |
| name     | String |
| email    | String |
| password | String |
| role     | Enum   |

### Product

| Field       | Type    |
| ----------- | ------- |
| id          | Long    |
| name        | String  |
| price       | Double  |
| category    | String  |
| description | String  |
| imageUrl    | String  |
| active      | Boolean |

### Cart Item

| Field    | Type    |
| -------- | ------- |
| id       | Long    |
| user     | User    |
| product  | Product |
| quantity | Integer |

### Order

| Field       | Type      |
| ----------- | --------- |
| id          | Long      |
| user        | User      |
| totalAmount | Double    |
| createdAt   | Timestamp |

---

# 🌙 Dark Mode

The application supports:

* Dark Theme
* Light Theme
* Theme Persistence using Local Storage

User preference remains saved across sessions.

---

# 📸 Image Upload Workflow

1. Admin selects image.
2. Frontend uploads image using Multipart Form Data.
3. Backend stores image locally.
4. Image URL is returned.
5. Product stores image URL.
6. Image is displayed dynamically.

---

# 🔄 Soft Delete System

Instead of permanently deleting products:

* Product is marked as inactive.
* Product disappears from user view.
* Admin can restore archived products later.

This preserves historical data and prevents accidental loss.

---

# 📡 REST API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Products

```http
GET    /products
GET    /products/{id}
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

### Upload

```http
POST /upload
```

### Cart

```http
GET    /cart
POST   /cart
PUT    /cart/{id}
DELETE /cart/{id}
```

### Orders

```http
POST /orders
GET  /orders
```

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

* REST API Development
* Spring Boot Architecture
* JWT Authentication
* Spring Security
* React State Management
* Role-Based Authorization
* File Upload Handling
* Database Design
* CRUD Operations
* Soft Delete Implementation
* Frontend-Backend Integration
* Exception Handling
* DTO Pattern
* Clean Code Practices

---

# 📈 Future Enhancements

* Payment Gateway Integration (Stripe/Razorpay)
* Product Reviews & Ratings
* Wishlist Feature
* Email Notifications
* Admin Analytics Dashboard
* Cloud Image Storage (AWS S3 / Cloudinary)
* Docker Deployment
* CI/CD Pipeline
* Redis Caching
* Elasticsearch Product Search

---

# 👨‍💻 Author

**Shashwat Garg**

Full Stack Java Developer | Spring Boot | React | REST APIs | MySQL

If you found this project interesting, feel free to star the repository ⭐
