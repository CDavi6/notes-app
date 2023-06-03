import { configureStore, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Load items from local storage
const loadItemsFromLocalStorage = () => {
  const storedItems = localStorage.getItem("items");
  return storedItems ? JSON.parse(storedItems) : [];
};

const saveItemsToLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

const itemsSlice = createSlice({
  name: "items",
  initialState: loadItemsFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: uuidv4(), // Generate a unique ID
        title: action.payload.title,
        text: action.payload.text,
      };
      state.push(newItem);
      saveItemsToLocalStorage(state); // Save items to local storage
    },
    updateItems: (state, action) => {
      const { id, text } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.text = text;
        saveItemsToLocalStorage(state); // Save items to local storage
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const updatedItems = state.filter((item) => item.id !== id);
      saveItemsToLocalStorage(updatedItems); // Save items to local storage
      return updatedItems;
    },
  },
});

export const { addItem, updateItems, deleteItem } = itemsSlice.actions;

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
  },
});

export default store;
