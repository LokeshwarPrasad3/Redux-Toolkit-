import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice"

// project consist only single store called : single source of truth


export const store = configureStore({
    reducer: {
        todos : todoReducer
    }
});