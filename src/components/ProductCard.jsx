// src/components/ProductCard.jsx
import { useCart } from '../context/CartContext';  // ✅ Import useCart

export default function ProductCard({ product }) {
    const { dispatch } = useCart();  // ✅ Get dispatch from context

    const handleAddToCart = () => {
        dispatch({ 
            type: 'ADD_TO_CART', 
            payload: product 
        });
    };

    return (
        <div className="w-full rounded-xl bg-white py-4 shadow-md sm:w-72 xl:[h-30.75rem] xl:w-70">
            <div className="flex h-56 items-center justify-center py-3">
                <img src={product.img} alt={product.name} className="w-40 object-contain" />
            </div>
            <h3 className="text-xl font-bold px-4">{product.name}</h3>
            <p className="px-4"><strong>Size:</strong> {product.size}</p>
            <p className="px-4"><strong>Color:</strong> {product.color}</p>
            <p className="px-4"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            
            {/* ✅ Add onClick handler */}
            <button 
                onClick={handleAddToCart}
                className="bg-black text-white py-2 px-4 rounded-md ml-4 mt-2 hover:bg-slate-400 transition-colors duration-300 cursor-pointer"
            >
                Add to Cart
            </button>
        </div>
    );
}