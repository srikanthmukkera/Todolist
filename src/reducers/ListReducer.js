import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todolist",
  initialState: {
    value: [],
  },
  reducers: {
    insertItem: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter(
        (item) => item?.id !== action.payload?.id
      );
    },
    updateItem: (state, action) => {
      state.value = state.value.map((item) =>
        item.id === action?.payload?.id ? action.payload : item
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertItem, updateItem, deleteItem } = todoSlice.actions;

export default todoSlice.reducer;
