import { CartItems } from "../redux/cartSlice";

export const CalcTotalPrice = (items: CartItems[]) => {
  return items.reduce((acc, obj) => {
    return obj.count * obj.price + acc;
  }, 0);
};
