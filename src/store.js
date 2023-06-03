// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addItem } = itemsSlice.actions;

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
  },
});

export default store;
