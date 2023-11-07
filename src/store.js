// store.js

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const notesSlice = createSlice({
  name: "notes",
  initialState: { notes: [] },
  reducers: {
    addNote: (state, action) => {
      return { ...state, notes: [...state.notes, action.payload] };
    },
    deleteNote: (state, action) => {
      const noteId = action.payload;
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== noteId),
      };
    },
    updateNote: (state, action) => {
      const { id, content } = action.payload;
      const updatedNotes = state.notes.map((note) => {
        if (note.id === id) {
          return { ...note, content };
        }
        return note;
      });
      return { ...state, notes: updatedNotes };
    },
    reorderNotes: (state, action) => {
      const { updatedNotes } = action.payload;
      return { ...state, notes: updatedNotes };
    },
  },
});

export const { addNote, deleteNote, updateNote, reorderNotes } =
  notesSlice.actions;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["notes"],
};

const persistedReducer = persistReducer(persistConfig, notesSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
