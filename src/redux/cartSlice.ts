import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CartItemsLS } from "../utils/CartItemsLS";
import { CalcTotalPrice } from "../utils/CalcTotalPrice";
export type CartItems = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
};
interface CartState {
  items: CartItems[];
  totalPrice: number;
}
const { items, totalPrice } = CartItemsLS();
const initialState: CartState = {
  items: items,
  totalPrice: totalPrice,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItems>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = CalcTotalPrice(state.items);
    },

    decrementItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const cartItemsIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const cartSelector = (state: RootState) => state.cart;
export const { addItems, removeItems, decrementItem, clearItems } =
  cartSlice.actions;
export default cartSlice.reducer;
