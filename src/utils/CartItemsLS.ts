import { CartItems } from "../redux/cartSlice";
import { CalcTotalPrice } from "./CalcTotalPrice";

export const CartItemsLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = CalcTotalPrice(items);
  return {
    items: items as CartItems[],
    totalPrice,
  };
};
