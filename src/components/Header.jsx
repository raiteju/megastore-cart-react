// src/components/Header.jsx
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // ✅ Import useCart

export default function Header() {
    const navigate = useNavigate();
    const { state } = useCart();  // ✅ Get cart state
    const { cartItems } = state;  // ✅ Get cartItems from state

    // ✅ Calculate total items in cart
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="mx-auto flex justify-between items-center p-4">
            <h2 
                className="text-2xl font-bold xl:text-3xl cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => navigate('/')}  // ✅ Click to go home
            >
                MegaStore
            </h2>
            
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                {/* Cart Icon */}
                <i className='bx bx-cart text-3xl transition-colors duration-300 hover:text-slate-500 xl:text-4xl'></i>
                
                {/* Badge - positioned on top of cart icon */}
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {cartCount}
                    </span>
                )}
            </div>
        </header>
    );
}