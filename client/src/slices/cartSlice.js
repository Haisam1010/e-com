import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.product === existItem.product ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems,item];
            }
            // 

            // Calculate item Price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty,0))

            // Shipping Price
            state.shippingPrice = addDecimals(state.itemsPrice > 50 ? 0 : 10)

            // Add Tax 
            state.addTax = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            // Total Price
            state.totalPrice = (
                Number(state.itemsPrice)+
                Number(state.shippingPrice)+
                Number(state)
            )
            localStorage.setItem('cart',JSON.stringify(state))
        },
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(
                (x) => x.product !== action.payload
            );
        },
    },

})

export default cartSlice.reducer;