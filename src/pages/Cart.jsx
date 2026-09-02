// src/pages/Cart.jsx
import CartSummary from '../components/CartSummary';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
    const navigate = useNavigate();
    const { state } = useCart();
    const { cartItems } = state;

    if (cartItems.length === 0) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold">Your Cart is empty</h2>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <span 
                        onClick={() => navigate('/')} 
                        className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                        Home
                    </span>
                    <span className="text-gray-300">&gt;</span>
                    <span className="text-gray-800 font-medium">Cart</span>
                </div>

                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">YOUR CART</h1>

                {/* Cart Content - Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items - Left Column (2/3 width on large screens) */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary - Right Column (1/3 width on large screens) */}
                    <div className="lg:col-span-1">
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}