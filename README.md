# 🥦 GrocerySub - Subscription-Based Grocery Delivery System

A full-stack MERN application that enables users to order groceries for one-time delivery or subscribe to recurring deliveries with flexible frequency options (Daily/Weekly).

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/krnike96/grocery-sub.git)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [User Roles](#-user-roles)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)

---

## ✨ Features

### Customer Features
- 🛒 **Browse Products** by category (Vegetables, Fruits, Dairy, Snacks)
- 🛍️ **One-Time Orders** with quantity selection
- 📅 **Subscription Management** with Daily/Weekly frequency
- 🏠 **Address Management** (Default or new address per order)
- 🛡️ **Stock Validation** to prevent over-ordering
- 💳 **Order Summary** with GST calculation and free delivery on orders above ₹499
- 📦 **View Active Subscriptions** with cancellation option

### Admin Features
- 📊 **Dashboard** with tabs for Orders, Products, Categories, and Users
- 🎯 **Order Management**: Update status (Pending → Out for Delivery → Delivered)
- 📦 **Inventory Control**: Add/Edit/Delete products and manage stock levels
- 🗂️ **Category Management**: Create new product categories
- 👥 **User Management**: View all users and remove accounts

### Delivery Personnel Features
- 🚚 **View Assigned Deliveries**
- 📍 **Update Delivery Status** (Assigned → In Transit → Delivered)
- 🗺️ **Real-time Order Tracking** (Placeholder UI ready)

### General Features
- 🔐 **JWT Authentication** with role-based access control
- 🔄 **Cart Synchronization** across devices (logged-in users)
- 📱 **Responsive Design** for mobile, tablet, and desktop
- 🎨 **Modern UI** with styled-components
- ⚡ **Fast Performance** with Vite build tool

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
Grocery-Sub/
├── backend-grocery/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification & admin check
│   ├── models/
│   │   ├── categoryModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   ├── subscriptionModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   ├── seeder.js                 # Sample data import script
│   └── server.js
│
└── frontend-grocery/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── axios.js          # Axios instance
    │   ├── components/
    │   │   ├── admin/Dashboard/
    │   │   ├── auth/
    │   │   │   ├── Login/
    │   │   │   ├── Register/
    │   │   │   └── ProtectedRoute.jsx
    │   │   ├── cart/Checkout/
    │   │   ├── delivery/Dashboard/
    │   │   ├── layout/Navbar/
    │   │   └── user/Dashboard/
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── data/
    │   │   └── groceryData.js
    │   ├── styles/
    │   │   └── GlobalStyle.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── vercel.json
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/krnike96/grocery-sub.git
cd grocery-sub
```

### Backend Setup
```bash
cd backend-grocery
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/grocery-db
JWT_SECRET=your_jwt_secret_key
```

Start MongoDB and seed sample data:
```bash
# Start MongoDB service (if local)
mongod

# Import sample data
npm run data:import

# Start backend server
npm run dev
```

### Frontend Setup
```bash
cd frontend-grocery
npm install
```

Update `src/api/axios.js` with your backend URL:
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change for production
});
```

Start development server:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/grocery-db
JWT_SECRET=my_super_secret_key_123
```

### Frontend
Update `baseURL` in `src/api/axios.js` for production deployment.

---

## 📖 Usage

### Test Accounts
After running the seeder, you can register new accounts or use these credentials:

**Admin Account** (Create via Register with "Administrator" role):
- Register with email/password and select "Administrator" role

**Customer Account**:
- Register with email/password and select "Customer" role
- Provide delivery address during registration

### Workflow

#### For Customers:
1. Browse products by category
2. Add items to cart (one-time or subscription)
3. Select frequency for subscriptions (Daily/Weekly)
4. Proceed to checkout
5. Choose default address or enter new one
6. Place order with Cash on Delivery
7. Manage subscriptions from dashboard

#### For Admins:
1. View all orders in real-time
2. Update order status (Ship → Deliver)
3. Manage product inventory
4. Add new products and categories
5. Monitor user accounts

#### For Delivery Personnel:
1. View assigned orders
2. Mark orders as "In Transit"
3. Complete delivery and mark "Delivered"

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/users              - Register user
POST   /api/users/login        - Login user
GET    /api/users/profile      - Get user profile (Protected)
PUT    /api/users/profile      - Update profile (Protected)
```

### Products
```
GET    /api/products           - Get all products
GET    /api/products/:id       - Get single product
POST   /api/products           - Create product (Admin)
PUT    /api/products/:id       - Update product (Admin)
DELETE /api/products/:id       - Delete product (Admin)
```

### Categories
```
GET    /api/categories/get-categories  - Get all categories
POST   /api/categories                 - Create category (Admin)
```

### Orders
```
POST   /api/orders                      - Place order (Protected)
GET    /api/orders                      - Get all orders (Admin)
PUT    /api/orders/:id/status           - Update order status (Admin)
DELETE /api/orders/:id                  - Delete order (Admin)
GET    /api/orders/my-subscriptions     - Get user subscriptions (Protected)
DELETE /api/orders/subscription/:id/cancel - Cancel subscription (Protected)
```

### Cart
```
GET    /api/users/cart         - Get user cart (Protected)
POST   /api/users/cart         - Save cart (Protected)
```

### Users (Admin Only)
```
GET    /api/users              - Get all users (Admin)
DELETE /api/users/:id          - Delete user (Admin)
PUT    /api/users/:id          - Update user (Admin)
```

---

## 👥 User Roles

| Role     | Access                                              |
|----------|-----------------------------------------------------|
| Customer | Browse, Order, Subscribe, Manage Cart & Profile    |
| Admin    | Full CRUD on Products, Orders, Categories, Users    |
| Delivery | View Assigned Orders, Update Delivery Status        |

---

## 🚀 Future Enhancements

- [ ] **Payment Gateway Integration** - Add Razorpay/Stripe for online payments
- [ ] **Real-time Notifications** - WebSocket implementation for order updates
- [ ] **Email Notifications** - Order confirmations and subscription reminders
- [ ] **Advanced Search & Filters** - Search by name, price range, and availability
- [ ] **Customer Reviews & Ratings** - Product feedback system
- [ ] **Delivery Slot Selection** - Choose preferred delivery time windows
- [ ] **Order History & Tracking** - Detailed order timeline for customers
- [ ] **Automated Subscription Orders** - Cron jobs for recurring deliveries
- [ ] **Multi-language Support** - Internationalization (i18n)
- [ ] **Dark Mode** - Theme toggle for better UX
- [ ] **Mobile App** - React Native version for iOS and Android
- [ ] **Analytics Dashboard** - Sales reports and insights for admins

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔗 Links

- **GitHub Repository**: [https://github.com/krnike96/grocery-sub.git](https://github.com/krnike96/grocery-sub.git)

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using MERN Stack**
