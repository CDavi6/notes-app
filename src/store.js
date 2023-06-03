import { configureStore, createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    updateItems: (state, action) => {
      return action.payload;
    },
  },
});

export const { addItem, updateItems } = itemsSlice.actions;

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
  },
});

export default store;
