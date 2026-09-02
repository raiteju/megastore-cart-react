// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from "react";
import { cartReducer, initialState } from "./CartReducer";  // ✅ Lowercase 'c'

const CartContext = createContext();

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}