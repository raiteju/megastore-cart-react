# 🛒 MegaStore - React E-Commerce Cart & Checkout

A fully functional e-commerce shopping cart and checkout system built with React, Tailwind CSS, and React Router. This project demonstrates a complete shopping experience from product browsing to order confirmation.

![Home Page](./screenshots/home.png)

## ✨ Features

- 🛍️ **Product Listing** - Browse products with images, sizes, colors, and prices
- 🛒 **Shopping Cart** - Add/remove items, update quantities, and view cart summary
- 📦 **Multi-Step Checkout** - Three-step process: Shipping → Payment → Review
- ✅ **Form Validation** - Required fields with error messages
- 💰 **Dynamic Calculations** - Subtotal, discount (10%), delivery fee, and total
- 📱 **Fully Responsive** - Works on all devices (mobile, tablet, desktop)
- 📝 **Order History** - View past orders with expandable details
- 💳 **Simulated Payment** - Demo payment processing with loading states
- 🎯 **Order Confirmation** - Professional thank you page with order details

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool
- **React Router DOM** - Navigation & Routing
- **Tailwind CSS** - Styling
- **Context API** - State Management
- **Local Storage** - Data Persistence

## 📁 Project Structure

megastore-cart-react/
├── src/
│ ├── assets/
│ │ └── images/ # Product images
│ ├── components/
│ │ ├── CartItem.jsx # Individual cart item
│ │ ├── CartSummary.jsx # Order summary component
│ │ ├── Header.jsx # Navigation header
│ │ └── ProductCard.jsx # Product display card
│ ├── context/
│ │ ├── CartContext.jsx # Cart state provider
│ │ └── CartReducer.jsx # Cart state reducer
│ ├── data/
│ │ └── product.jsx # Product data
│ ├── pages/
│ │ ├── Home.jsx # Product listing page
│ │ ├── Cart.jsx # Shopping cart page
│ │ ├── Checkout.jsx # Multi-step checkout
│ │ ├── OrderConfirmation.jsx # Order success page
│ │ └── Orders.jsx # Order history page
│ ├── App.jsx # Main app with routes
│ ├── main.jsx # Entry point
│ └── index.css # Tailwind styles
├── screenshots/ # Project screenshots
├── .gitignore # Git ignore file
├── index.html # HTML template
├── package.json # Dependencies
├── README.md # Project documentation
├── vite.config.js # Vite configuration
└── eslint.config.js # ESLint configuration



## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/raiteju/megastore-cart-react.git

# 2. Navigate to project directory
cd megastore-cart-react

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open your browser and visit
# http://localhost:5173

## Build for Production

# Create production build
npm run build

# Preview production build
npm run preview
