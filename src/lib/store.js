
import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "@/redux/cartSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartSliceReducer,


          },
    })
  }

export const store = makeStore();