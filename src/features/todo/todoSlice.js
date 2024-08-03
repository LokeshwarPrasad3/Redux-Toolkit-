import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "Hello World" }]
}

// create slice or reducer  
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: { // properties and functions called todoSlice.actions
        addTodo: (state, action) => {
            if (!action.payload) {
                return;
            }
            // get todo from user
            const todo = {
                id: nanoid(),
                text: action.payload
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, text: action.payload.text }
                }
                return todo;
            })
        }
    }
})


export const { addTodo, removeTodo, editTodo } = todoSlice.actions

export default todoSlice.reducer