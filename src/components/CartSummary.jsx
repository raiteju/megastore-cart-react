// src/components/CartSummary.jsx
import { useNavigate } from 'react-router-dom';  // ✅ Add this import
import { useCart } from '../context/CartContext';

export default function CartSummary() {
    const navigate = useNavigate();  // ✅ Add this
    const { state } = useCart();
    const { cartItems } = state;

    // Calculate totals
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * 0.1; // 10% discount
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="rounded-3xl border border-neutral-300 p-4 xl:p-6 xl:w-full xl:h-94">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                    <span>Discount (-10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-neutral-300 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* ✅ Added onClick handler */}
            <button 
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
            >
                Go to Checkout →
            </button>
        </div>
    );
}