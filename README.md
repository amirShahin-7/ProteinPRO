# Protein Pro - E-commerce Application

A modern, full-stack e-commerce application for protein supplements built with React, Node.js, Express, and PostgreSQL with Prisma ORM.

## 🚀 Features

### User Features
- **Authentication**: Secure login/signup with JWT tokens
- **Product Browsing**: Browse products by category with search functionality
- **Shopping Cart**: Add/remove items with quantity management
- **User Profile**: Update personal information and profile picture
- **Order Management**: View order history and track orders
- **Product Reviews**: Rate and review products

### Admin Features
- **Dashboard**: Analytics and statistics overview
- **Product Management**: CRUD operations for products
- **User Management**: View, edit, and manage user accounts
- **Order Management**: Process and track orders
- **Category Management**: Organize products by categories

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Material Tailwind** - UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **SweetAlert2** - Notifications

### Backend

## 📋 Prerequisites

## 🔐 Authentication

1. **Login**: Users authenticate with email/username and password
2. **Token Storage**: JWT tokens are stored in localStorage
3. **Protected Routes**: Admin routes require admin role
4. **Token Refresh**: Automatic token validation on API calls

## 📁 Project Structure

```
ProteinPRO/
├── About Project.md
├── eslint.config.js
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
│   ├── bg.mp4
│   ├── logo.png
│   ├── logo2.png
│   └── logoWhite.png
├── README.md
├── src/
│   ├── AdminLayout.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── adminHeader/
│   │   │   ├── AdminNavbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── UserMenu.jsx
│   ├── context/
│   │   └── context.js
│   ├── firebase.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotAllowed.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── home/
│   │   │   └── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── product/
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Products.jsx
│   │   └── Profile.jsx
│   └── UserLayout.jsx
├── tailwind.config.js
├── vercel.json
└── vite.config.js


**Note**: This is a professional e-commerce application designed for scalability and maintainability. The codebase follows best practices and includes comprehensive error handling, validation, and security measures. 