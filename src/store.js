import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
  // Define the root reducer object
  reducer: {
    // 'cart' slice is managed by cartReducer
    cart: cartReducer,
  },
});

export default store; // Export the store for use with <Provider>
