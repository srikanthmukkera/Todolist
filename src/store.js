import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/ListReducer";
export default configureStore({
  reducer: {
    todolist: todoReducer,
  },
});
