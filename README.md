# Redux-Toolkit: State Management in React

Redux-Toolkit is a popular library for managing state in React applications. It provides a set of tools and utilities to help you manage your application's state in a predictable and scalable way.

## Libraries Used

1. **@reduxjs/toolkit**
   - A library for managing state efficiently and with minimal boilerplate.

2. **react-redux**
   - Redux implementation for React, providing hooks and components to connect your React components with the Redux store.

## Setup Process

### 1. Create a Redux Store

Create a Redux store inside `src/app/store.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: todoReducer
});
```

### 2. Create a Reducer Using createSlice
Create a reducer inside `src/features/todo/todoSlice.js`:

```javascript
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [{ id: 1, text: 'Hello World' }]
};

// Create slice (reducers and actions)
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // Add a new todo
      const todo = {
        id: nanoid(),
        text: action.payload
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, text: action.payload.text };
        }
        return todo;
      });
    }
  }
});

```


### 3. Use useSelector and useDispatch from react-redux

```javascript
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

// Inside your component
const dispatch = useDispatch();
dispatch(addTodo(input));

```

### 4. Wrap Your App with Provider
Wrap your application with Provider in `src/main.js`:

```javascript
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

<Provider store={store}>
  <App />
</Provider>

```