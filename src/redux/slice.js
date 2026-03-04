import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: 0,
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

// Action
const addToCart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // state.value += 1;
      console.log(action.payload);
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      // removing the item from the cart
      const cartData = state.items.filter(
        (item) => item.id != action.payload.id,
      );
      state.items = cartData;
      localStorage.setItem("cart", JSON.stringify(cartData));
    },
    clearAllItem: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearAllItem } = addToCart.actions;

export default addToCart.reducer;
