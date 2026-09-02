// src/context/CartReducer.jsx

export const initialState = {
    cartItems: [],
};

export function cartReducer(state, action) {  // ✅ Changed to lowercase 'c' to match import
    switch (action.type) {
        case "ADD_TO_CART": {
            const item = action.payload;
            
            const existingItem = state.cartItems.find(  // ✅ Changed to 'existingItem'
                (cartItem) => cartItem.id === item.id
            );
            
            if (existingItem) {  // ✅ Now matches the variable name
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    ),
                };
            }

            return {
                ...state,
                cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
        }

        case "DECREMENT": {
            const id = action.payload;

            return {
                ...state,
                cartItems: state.cartItems
                    .map((cartItem) =>
                        cartItem.id === id
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    )
                    .filter((cartItem) => cartItem.quantity > 0),
            };
        }

        case "REMOVE_FROM_CART": {
            const id = action.payload;

            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem) => cartItem.id !== id),
            };
        }

        default:
            return state;
    }
}