// src/components/CartItem.jsx
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
    const { dispatch } = useCart();

    return (
        <div className="rounded-3xl border border-neutral-300 px-4 py-6 sm:flex-row sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200';
                        }}
                    />
                </div>

                {/* Product Details - Full width with proper spacing */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Color: {item.color}</p>
                        <p className="text-xl font-bold text-blue-600 mt-1">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls & Remove - Aligned to the right */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 items-center gap-4 rounded-3xl bg-white shadow-sm px-4">
                            <button 
                                onClick={() => dispatch({ type: 'DECREMENT', payload: item.id })}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <i className="bx bx-minus text-lg"></i>
                            </button>
                            <span className="w-10 text-center font-medium">{item.quantity}</span>
                            <button 
                                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <i className="bx bx-plus text-lg"></i>
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                        >
                            <i className="bx bx-trash text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}