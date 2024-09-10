"use client";

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: typeof window !== "undefined" && sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems"))
    : [],
  cartTotal: 0,
  cartQtyTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        console.log("found");
        toast.error(`${action.payload.title} is already exist in cart`);
        return;
      } else {
        state.cartItems.push({ ...action.payload, itemQty: 1 });
        if (typeof window !== "undefined") {
          sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
        toast.success(`${action.payload.title} added to cart`);
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      toast.success(`${item.title} removed from cart`);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    increaseQty: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (
        itemIndex >= 0 &&
        state.cartItems[itemIndex].quantity > state.cartItems[itemIndex].itemQty
      ) {
        state.cartItems[itemIndex].itemQty += 1;
        if (typeof window !== "undefined") {
          sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      } else {
        toast.error("Out of stock");
      }
    },
    decreaseQty: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].itemQty > 1) {
        state.cartItems[itemIndex].itemQty -= 1;
        if (typeof window !== "undefined") {
          sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },

    calculateTotals: (state) => {
      const { cartTotal, cartQtyTotal } = state.cartItems.reduce(
        (total, cartItem) => {
          const { price, itemQty } = cartItem;
          total.cartTotal += price * itemQty;
          total.cartQtyTotal += itemQty;
          return total;
        },
        {
          cartTotal: 0,
          cartQtyTotal: 0,
        }
      );

      state.cartTotal = cartTotal;
      state.cartQtyTotal = cartQtyTotal;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
