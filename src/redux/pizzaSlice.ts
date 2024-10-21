import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
type Pizza = {
  id: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6638fbab4253a866a24fe2c5.mockapi.io/Items?${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
enum FetchPizza {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface PizzaState {
  pizzas: Pizza[];
  status: "loading" | "success" | "error";
}
const initialState: PizzaState = {
  pizzas: [],
  status: FetchPizza.LOADING,
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = FetchPizza.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = FetchPizza.SUCCESS;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = FetchPizza.ERROR;
      state.pizzas = [];
    });
  },
});

export const pizzaStatusSelector = (state: RootState) => state.pizza;
export default pizzaSlice.reducer;
