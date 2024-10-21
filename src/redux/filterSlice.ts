import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
export enum SortPropertyEnum {
  RATINGASC = "rating",
  RATINGDESC = "-rating",
  PRICEASC = "price",
  PRICEDESC = "-price",
  TITLEASC = "title",
  TITLEDESC = "-title",
}

type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterState {
  categoryId: number;
  sort: Sort;
  searchValue: string;
  pageCount: number;
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: "Популярность asc",
    sortProperty: SortPropertyEnum.RATINGASC,
  },
  searchValue: "",
  pageCount: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
  },
});
export const filterSelector = (state: RootState) => state.filter;
export const categoryIdSelector = (state: RootState) => state.filter.categoryId;
export const sortSelector = (state: RootState) => state.filter.sort;
export const { setCategoryId, setSortType, setSearchValue, setPageCount } =
  filterSlice.actions;
export default filterSlice.reducer;
